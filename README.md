# Ego

**Ego** is a project that is meant to explore the idea of human perception, in particular the idea of identity and self
consciousness and the way it is distorted and biased.
It is available at this [link](https://github.com/mpetteno-polimi/CPAC-Ego)

## Artistic vision

We implemented this project as a webapp to make the experience available to everyone, but it can also be imagined in
the context of an artistic installation: the user's first approach would be defined by the vision of a
cloud of swirling particles, while an undefined drone sound is playing. Once the user is close enough to be detected by
our system the cloud will start to slowly morph into a shape resembling its face: the user is now witnessing their
identity take shape. A repeating melody would be heard, whose generation is based on the user's face, in particular on
their somatic traits and their current mood. The intrigued user might now get even closer, in which case they'll hear
the music become more and more intense, in a higher pitch and faster, representing an ever-growing feedback loop of self
consciousness. The final phase of Ego will show the user their face being morphed into a new shape, reminiscent of a
[Rorschach Test](https://en.wikipedia.org/wiki/Rorschach_test), to finally express the idea of the distortion of the
self caused by the filtering of external point of view.

## Webapp design

The webapp is implemented as single-page application (SPA) in [Svelte](https://svelte.dev/).
It is designed based on two coding principles:

- **Modularity**: thanks to the strong typing of [TypeScript](https://www.typescriptlang.org/) it is possible to
  well define complex objects that conceptually represent a module within the application (e.g. `MusicGenerator`). This
  approach allows for a strong semantic separation (cleaner code) and a scalable evolution of the project.
- **Configurability**: the fundamental parameters of the application should be easily configurable via the `config.ts`
  file and the user can play with Shaders parameters using the control GUI provided by
  [dat.GUI](https://github.com/dataarts/dat.gui#readme): this can be enabled by setting the `automateParameters` flag in
  the configuration file.

## Graphics design

The visual graphics of the application have been implemented in [Three.js](https://threejs.org/) with the support of
external libraries such as:

- [lygia](https://github.com/patriciogonzalezvivo/lygia): a shader library that includes several common GLSL functions
  (included as git submodule in `/src/ext/glsl/`)
- [gsap](https://greensock.com/gsap/): animation library
- [three-msdf-text-utils](https://github.com/leochocolat/three-msdf-text-utils): utility classes for Text rendering in
  Three.js using Bitmap fonts and MSDF (multichannel signed distance fields)

### Swirling particles

The swirling point cloud that introduces the main loop consists of a sphere subjected to a curl noise field: the
computation of the position and velocity of the particles in this field is performed entirely in the GPU by exploiting
the [GPUComputationRenderer](https://github.com/epranka/gpucomputationrender-three) class. This approach allows to save
the current state of the two variables in the graphics memory and use it for the subsequent computation of the same,
without having to read new data passing through the CPU.

### Face and expression detection

To capture the user's face we took advantage of Google MediaPipe'
s [Face Mesh](https://www.npmjs.com/package/@mediapipe/face_mesh)
library for Javascript: this solution perfectly matches our requirements since it exploits Machine Learning and GPU
acceleration to estimates 468 3D face landmarks in real-time without requiring dedicated depth sensors (only a single
camera). To obtain the desired number of particles once the 468 landmarks have been acquired, we triangulate the latter
with **3D Catmull–Rom splines** following the indications of
the [file](https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/demos/shared/triangulation.js)
provided by the library - taking care to exclude the internal part of the eyes - and carry out a sampling along these
curves.
Face expression detection is powered by [this](https://github.com/vladmandic/face-api) fork of
[face-api](https://justadudewhohacks.github.io/face-api.js/docs/index.html): we used this fork because it is shipped
with a newer version of TensorFlow that matches the requirements of the one included with MediaPipe's Face Mesh.

### Final shape generation

The final figure to which the face morphs is randomly generated at each iteration of the loop and for this purpose
three distinct algorithms have been implemented:

- **SVG images**: this method loads an SVG image from a specified path and extrudes its 3D geometry using the
  Three.js `ExtrudeGeometry` class. To obtain the desired number of particles, the mesh is than sampled using the
  `MeshSurfaceSampler` utility that returns weighted random points on its surface: once built the sampler - an O(n)
  operation - any number of random samples may be selected in O(logn). The paths of the SVG images are read from the
  configuration file thus facilitating the insertion of new images; currently there are ten images available that
  corresponds to the pictures of the original Rorschach Test cards
- **Perlin noise**: the algorithm fills a square, drawing pixel by pixel. Each pixel's greyscale value is determined by
  2D Perlin noise, evaluated in a point proportional to the pixels' coordinates. Additionally, a pixels' intensity fades
  away as the distance from the origin grows. The result so far is an image resembling a circular cloud, with hazy
  borders. The image is then mirrored vertically and horizontally. The final step of our algorithm is to apply a
  threshold filter, finally obtaining a symmetric shape with sharp borders.
- **Physics-based algorithm**: this algorithm simulates the movement of a predetermined number of
  particles which start from a central point and are affected by a random initial velocity (both modulus and angle)
  and by constant deceleration (much like particles of ink). The position of each particle at `t = t_final` is computed,
  where `t_final` is a discrete time step that has been empirically determined. The points are then sorted by their
  angle
  with respect to the origin; this allows us to trace a contour given the points. Finally, for each particle, a
  symmetrical (with respect to the x dimension) is added to better mimic the look of Rorschach images.

## Music generation

We implemented an algorithm for real time music generation. At its core is a Markov chain of second order, used for
generating scale degrees. In practice, it corresponds to a 7x7x7 table whose columns are the probabilities for the 7
scale degrees to be generated and whose rows are the 7x7 possible combinations of 2 previously generated degrees.
This table is filled by mapping 343 face landmarks on it, establishing a connection between the user's face
characteristics and the music probabilistic model. When a new face is detected, a melody of random length is generated
based on this model. The melody is then played repeatedly and occasionally mutated over time, with some probability for
the mutation to happen. When a mutation happens, a new scale degree or a new duration substitutes the old one. In
addition to this melody we generate a bass and some chords. The chords are generated by randomly choosing a scale
degree and building a triad or a 7th chord on top of it, inside the current scale. The detected sentiment is mapped to
one of 7 possible scales, corresponding more or less the user's mood. Pitches and durations are generated separately,
with another Markov chain of order 1 taking care of the duration generation. This implementation of Markov's chains is
filled with predefined probability values. When a new face is detected a couple of parameters are randomized, in order
to reinforce the idea of tying the user's identity to the generated composition. Among these parameters are the bpm,
melody and bass register, chance for a melody to be altered, chance for bass and chords to be played. An estimation of
the users' distance further controls the BPM and randomizes the octaves. The distance and the confidence of the model
used for sentiment detection are also used as sound design parameters in Max.

## Sound design

As far as sound design is concerned, we immediately started with the idea of using an external tool controlled via
the OSC protocol, but given the nature of the application we realized that it was necessary to make the sound
experience available also in the browser nto on-expert users. For this purpose we have designed the system to be able
to handle both situations: if there is an active OSC connection it will be used,
otherwise [Tone.js](https://tonejs.github.io/)
in the browser will take care of the sound output.

### OSC integration

OSC communication is provided by the [osc-js](https://github.com/adzialocha/osc-js#readme) library which provides out
of the box a bridge between WebSocket (browser) and UDP (external tool) communications. Port used for UDP communication
is `9129`.

### Max

The external tool that we choose for our sound design is [Max 8](https://docs.cycling74.com/max8). The main patch in
Max is divided into the following sections:

- OSC Receiver
- Audio Generation
- Mixer
- Master Effects

The main objects that make up the patch are:

- Oscillators: mainly used for the generation of desired sounds.
- `mc.matrix~` object: which we mainly use to create effect sends that will be mixed to the dry signal.
- Scale object: which allows us to map parameters in a given range.
- KiloHearts Essential Plugins: used for sound effects.

Concerning the sound design of the various instruments (Arpeggio, Bass, Drone) we started from a template of Additive
Synthesis created by us and then modified it in order to achieve the desired sound.
The template consists of 4 oscillators in which we can decide each waveform, envelope and amplitude. We also have
several LFOs available for each of them, both for frequency modulation and amplitude modulation.
Next we find an EQ that allows us to choose any type of filter and change its parameters (cut, gain, Q) and finally our
effect plugins.

For the noise drone we used a sample. This sample is first added into a buffer, and then using the Stretch~ object we
modify the buffer contents in a "destructive" way both in terms of pitch and time.
Next we generate 16 channels of a signal, and we divert them and then multiply them by the sample inserted previously in
the buffer. This makes it possible to generate a particular noise effect. In the end, we apply the effect sends to the
noise drone.

When it comes to receiving OSC messages, in addition to notes messages and control messages, we have 4 sound design
parameters:

- Parameter 1: corresponds to the Bloom (post-processing effect) intensity, mapped in Max to the Depth, Rate, Mix
  parameters of the Flanger in the subpatch `TryPoly_CPAC` and the Cut of the lowpass filter.
- Parameter 2: corresponds to the particle Noise Amplitude and is mapped to the cutoff of the lowpass filter and to the
  Amplitude of the pink noise in the `SynthAddCpac_DRONE_DO` Subpatch, and to the Mix parameter of Ensemble plugin in
  the `Structure_CPAC` patch.
- Parameter 3: corresponds to the Confidence of Sentiment Detection and is mapped to the Spread parameter of Phase
  Distorsion plugin in the `SynthAddCpac_DRONE_DO` subpatch and to the detune parameter of Ensemble Plugin in
  the `Structure_CPAC` patch.
- Parameter 4: corresponds to the face distance and is mapped to the amplitude of the fourth oscillator of
  the `SynthAddCpac_DRONE_DO` subpath e and to the ADSR’s attack and the amplitude of the `SynthAddCpac_ARP` subpatch.

### ToneJS

At the moment the following synthesizers are implemented in Tone.js:

- A Polyphonic synthesizer, using `Tone.PolySynth`
- A drone, a bass, and a lead synthesizer, using `Tone.Synth`
- A noise synthesizer, using `Tone.NoiseSynth`

Also, the following effects and filters are implemented:

- Low pass filters for the lead and drone synthesizers, using `Tone.Filter`
- Convolution reverb for the lead and drone synthesizers, using `Tone.Reverb`

## How to run locally

To run the application locally simply run:

- `npm install`
- `npm run dev`

If you want to start OSC communication run:

- `node ./src/ext/osc/osc-bridge-server.js`
- Reload the app if running

## Known issues

- Face triangulation algorithm is a bottleneck since it doesn't scale well with the number of particles
- Face Mesh models loading is slow the first time (especially in the public application)

## Roadmap

### Prototype after the hackathon

- Generate a face mesh from the webcam’s input in real time ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- ~~Use face’s to generate a grammar string for music composition~~
- ~~Define a grammar for the composition~~
- Generate music in PureData/Max via OSC ![100%](https://progress-bar.dev/100) &rarr; **Samuele**

### Final project

- Face triangulation ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- ~~Image's object contour recognition~~
- Continuous loop morphing between face and abstract shapes ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- Define markov chain for the composition ![100%](https://progress-bar.dev/100) &rarr; **Sebastian**
- Alter sound based on the heads spatial parameters ![100%](https://progress-bar.dev/100) &rarr; **Sebastian**
- OSC integration ![100%](https://progress-bar.dev/100) &rarr; **Sebastian** + **Samuele**
- Real time generation of morphing target images ![100%](https://progress-bar.dev/100)
    - SVG morph target loader ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
    - Perlin noise symmetric image generator ![100%](https://progress-bar.dev/100) &rarr; **Sebastian** + **Matteo**
    - Processing based morph target generator ![100%](https://progress-bar.dev/100) &rarr; **Tommaso**
- Splash screen ![75%](https://progress-bar.dev/75) &rarr; **Matteo**
    - **TODO** - Modal view with experience guide
- Noise automation during loop's animation ![100%](https://progress-bar.dev/100) &rarr; **Matteo + Sebastian**
- Improve rendering and colours ![100%](https://progress-bar.dev/100)
- ToneJS player if OSC not available ![100%](https://progress-bar.dev/100)
- README + Presentation slides ![50%](https://progress-bar.dev/50)
- Handle multiple faces at the same time ![0%](https://progress-bar.dev/0)
