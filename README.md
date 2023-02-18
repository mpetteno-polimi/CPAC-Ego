Creative Programming and Computing
A. Y. 2022-2023
Abstract of the project

# Ego

## Name of the group

## Members of the group
1.	Sebastian Gafencu https://github.com/sebastiangafencu
2.	Samuele Del Moro - https://github.com/SamueleDelMoro
3.	Matteo Pettenò - https://github.com/mpetteno-polimi

## Github repository
https://github.com/mpetteno-polimi/CPAC-Project

# Abstract
The goal of this project is to build a real time 3D model of the user face and then slowly morph it into abstract shapes, representing the degradation of one's identity as perceived through an external point of view, and the liquid nature of the self.
For these reasons, we want the target shapes of the morph to have an aesthetic that reminds of the Rorschach tests. These shapes will be generated randomly, in real time.
The face's landmarks will be also used to compose a unique generative soundtrack in real time, by controlling and altering a "sentence" (string of symbols used to compose the music in real time). The aim is to tie each face to a different musical entity.

## Artistic vision
With this project we want to explore perception, as a reconstruction based on one's model of the world. The idea that our view of the world is a projection of our own model of it, leads inevitably to the problem of discrepancy: reality is not what we think it is and we are not what we think we are. We want to explore the theme of a feedback loop between world and self, and the concept of cognitive dissonance/reality distortion.

## Prototype after the hackathon
- Generate a face mesh from the webcam’s input in real time ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- ~~Use face’s to generate a grammar string for music composition~~
- ~~Define a grammar for the composition~~
- Generate music in PureData/Max via OSC ![50%](https://progress-bar.dev/70) &rarr; **Samuele**

# Final project
- Face triangulation ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- Noise automation during loop's animation ![70%](https://progress-bar.dev/20) &rarr; **Matteo + Sebastian**
- ~~Image's object contour recognition~~
- Continuous loop morphing between face and abstract shapes ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
- Define markov chain for the composition ![100%](https://progress-bar.dev/100) &rarr; **Sebastian**
- Alter sound based on the heads spatial parameters ![90%](https://progress-bar.dev/90) &rarr; **Sebastian**
- OSC integration ![70%](https://progress-bar.dev/70) &rarr; **Sebastian** + **Samuele**
  - **TODO** - Send start and stop for drones (also for splash screen)
  - **TODO** - Review play and stop messages during loop
- Real time generation of morphing target images ![90%](https://progress-bar.dev/90)
  - SVG morph target loader ![100%](https://progress-bar.dev/100) &rarr; **Matteo**
  - Perlin noise symmetric image generator ![80%](https://progress-bar.dev/80) &rarr; **Sebastian** + **Matteo**
    - **TODO** - Improve perlin noise generator parameters &rarr; **Sebastian**
- Splash screen ![50%](https://progress-bar.dev/50) &rarr; **Matteo**
  - **TODO** - Text animation
  - **TODO** - Modal view with experience guide
- Processing based morph target generator ![30%](https://progress-bar.dev/30) &rarr; **Tommaso**
  - **TODO** - ThreeJS porting
- Improve rendering and colours ![0%](https://progress-bar.dev/0)
- ToneJS player if OSC not available ![0%](https://progress-bar.dev/0)
- README + Presentation slides ![0%](https://progress-bar.dev/0)
- Handle multiple faces at the same time ![0%](https://progress-bar.dev/0)
