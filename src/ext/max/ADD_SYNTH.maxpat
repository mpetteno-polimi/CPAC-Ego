{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ -71.0, -963.0, 1612.0, 929.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-176",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 4.0, 126.66333373069763, 100.0, 22.0 ],
					"text" : "unpack"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-174",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4.0, 65.336666507720949, 100.0, 22.0 ],
					"text" : "pack"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-173",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "int", "int" ],
					"patching_rect" : [ 4.0, 30.669999642372133, 100.0, 22.0 ],
					"text" : "notein"
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-170",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 522.0, 1220.0, 300.0, 100.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, "H-Delay (s).auinfo", ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~[4]",
							"parameter_shortname" : "vst~[4]",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "H-Delay (s).auinfo",
							"plugindisplayname" : "H-Delay (s)",
							"pluginsavedname" : "",
							"pluginsaveduniqueid" : 1212302419,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"sliderorder" : [  ],
							"slidervisibility" : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
							"blob" : "1345.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPL..............bA.....CsK......D.QP.L.....BLjk......v..........PvO.B......EPjd......fACoO......b.P........H.........PB.........n..........K..........CDoG......z..........N.........vCCYppqB....wP6B......QPDD.C....fD.........LA.........T.........PECMC......XwPy...RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQLPe..v.8A...P....P.HIDQSMWYzED..LPXXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhfjPDwjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9fTKDUFagkGOu.Ea0cVZt4TXsUlOJ.BHfvCTrU2Yo41T0I1Pu0Fb9fjPDMEOu.Ea0cVZtMUchMzasAmOJ.BHfvCTrU2Yo4lUkI2bo8la9DCMt.iK3LiK3PCOu.Ea0cVZtYUYxMWZu4lOJ.BHfvSPiQWZ1U1TkQWcv4yTEQUUP8UP77RPiQWZ1U1TkQWcv4iBf.BH7vzagQVSk4VcCEFckc1axkmOFE1Xz8lb4wyKL8VXj0TYtU2PgQWYm8lb44iBf.BH7HUYgQ1StwVd9Pmb0UFOuHUYgQ1StwVd9n.HfvyKPIWYyUFcHUVXjUlb9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8UPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLyM0.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLiM1.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.H77BTxU1bkQmOJvyKPIWYyUFcCgVctsFVMwDUxUVY9nfDHIDQSAA.RDVcsYFVU4FcoQGakQF.H.PF.XB.q..N.LD.KAvT.fE.cAfXAjR.tD.LAHS.0DvMAXT.IEvVDvMAgSv3DfN.......f.A..........F...................AwC"
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "H-Delay (s)",
									"origin" : "H-Delay (s).auinfo",
									"type" : "AudioUnit",
									"subtype" : "MidiEffect",
									"embed" : 0,
									"snapshot" : 									{
										"pluginname" : "H-Delay (s).auinfo",
										"plugindisplayname" : "H-Delay (s)",
										"pluginsavedname" : "",
										"pluginsaveduniqueid" : 1212302419,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"sliderorder" : [  ],
										"slidervisibility" : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
										"blob" : "1345.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPL..............bA.....CsK......D.QP.L.....BLjk......v..........PvO.B......EPjd......fACoO......b.P........H.........PB.........n..........K..........CDoG......z..........N.........vCCYppqB....wP6B......QPDD.C....fD.........LA.........T.........PECMC......XwPy...RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQLPe..v.8A...P....P.HIDQSMWYzED..LPXXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhfjPDwjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9fTKDUFagkGOu.Ea0cVZt4TXsUlOJ.BHfvCTrU2Yo41T0I1Pu0Fb9fjPDMEOu.Ea0cVZtMUchMzasAmOJ.BHfvCTrU2Yo4lUkI2bo8la9DCMt.iK3LiK3PCOu.Ea0cVZtYUYxMWZu4lOJ.BHfvSPiQWZ1U1TkQWcv4yTEQUUP8UP77RPiQWZ1U1TkQWcv4iBf.BH7vzagQVSk4VcCEFckc1axkmOFE1Xz8lb4wyKL8VXj0TYtU2PgQWYm8lb44iBf.BH7HUYgQ1StwVd9Pmb0UFOuHUYgQ1StwVd9n.HfvyKPIWYyUFcHUVXjUlb9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8UPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLyM0.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLiM1.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.H77BTxU1bkQmOJvyKPIWYyUFcCgVctsFVMwDUxUVY9nfDHIDQSAA.RDVcsYFVU4FcoQGakQF.H.PF.XB.q..N.LD.KAvT.fE.cAfXAjR.tD.LAHS.0DvMAXT.IEvVDvMAgSv3DfN.......f.A..........F...................AwC"
									}
,
									"fileref" : 									{
										"name" : "H-Delay (s)",
										"filename" : "H-Delay (s)_20230214_1.maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "7783704cf3ce22fbbbf8e325060b7017"
									}

								}
 ]
						}

					}
,
					"text" : "vst~ \"H-Delay (s).auinfo\"",
					"varname" : "vst~[4]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-169",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 806.0, 465.0, 139.0, 22.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, "H-Delay (s).auinfo", ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~[2]",
							"parameter_shortname" : "vst~[2]",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "H-Delay (s).auinfo",
							"plugindisplayname" : "H-Delay (s)",
							"pluginsavedname" : "",
							"pluginsaveduniqueid" : 1212302419,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"blob" : "1345.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPL..............bA.....CsK......D.QP.L.....BLjk......v..........PvO.B......EPjd......fACoO......b.P........H.........PB.........n..........K..........CDoG......z..........N.........vCCYppqB....wP6B......QPDD.C....fD.........LA.........T.........PECMC......XwPy...RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQLPe..v.8A...P....P.HIDQSMWYzED..LPXXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhfjPDwjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9fTKDUFagkGOu.Ea0cVZt4TXsUlOJ.BHfvCTrU2Yo41T0I1Pu0Fb9fjPDMEOu.Ea0cVZtMUchMzasAmOJ.BHfvCTrU2Yo4lUkI2bo8la9DCMt.iK3LiK3PCOu.Ea0cVZtYUYxMWZu4lOJ.BHfvSPiQWZ1U1TkQWcv4yTEQUUP8UP77RPiQWZ1U1TkQWcv4iBf.BH7vzagQVSk4VcCEFckc1axkmOFE1Xz8lb4wyKL8VXj0TYtU2PgQWYm8lb44iBf.BH7HUYgQ1StwVd9Pmb0UFOuHUYgQ1StwVd9n.HfvyKPIWYyUFcHUVXjUlb9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8UPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLyM0.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLiM1.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.H77BTxU1bkQmOJvyKPIWYyUFcCgVctsFVMwDUxUVY9nfDHIDQSAA.RDVcsYFVU4FcoQGakQF.H.PF.XB.q..N.LD.KAvT.fE.cAfXAjR.tD.LAHS.0DvMAXT.IEvVDvMAgSv3DfN.......f.A..........F...................AwC"
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "H-Delay (s)",
									"origin" : "H-Delay (s).auinfo",
									"type" : "AudioUnit",
									"subtype" : "MidiEffect",
									"embed" : 0,
									"snapshot" : 									{
										"pluginname" : "H-Delay (s).auinfo",
										"plugindisplayname" : "H-Delay (s)",
										"pluginsavedname" : "",
										"pluginsaveduniqueid" : 1212302419,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"blob" : "1345.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPL..............bA.....CsK......D.QP.L.....BLjk......v..........PvO.B......EPjd......fACoO......b.P........H.........PB.........n..........K..........CDoG......z..........N.........vCCYppqB....wP6B......QPDD.C....fD.........LA.........T.........PECMC......XwPy...RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQLPe..v.8A...P....P.HIDQSMWYzED..LPXXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhfjPDwjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9fTKDUFagkGOu.Ea0cVZt4TXsUlOJ.BHfvCTrU2Yo41T0I1Pu0Fb9fjPDMEOu.Ea0cVZtMUchMzasAmOJ.BHfvCTrU2Yo4lUkI2bo8la9DCMt.iK3LiK3PCOu.Ea0cVZtYUYxMWZu4lOJ.BHfvSPiQWZ1U1TkQWcv4yTEQUUP8UP77RPiQWZ1U1TkQWcv4iBf.BH7vzagQVSk4VcCEFckc1axkmOFE1Xz8lb4wyKL8VXj0TYtU2PgQWYm8lb44iBf.BH7HUYgQ1StwVd9Pmb0UFOuHUYgQ1StwVd9n.HfvyKPIWYyUFcHUVXjUlb9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8UPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLyM0.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3iJfDCHwHCLfLiM1.RLw.hJfDCLv.hMv.BLf.iBv.hJfnBHp.BLfHCLw.CLfnBHwjCHpn.Lf.iKw.CLv.CLv.CLv.CLv.CLv.SM0TCHv.hJfHCHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBHpnfJfnBHp.hJfnBHp.hJfnBH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.H77BTxU1bkQmOJvyKPIWYyUFcCgVctsFVMwDUxUVY9nfDHIDQSAA.RDVcsYFVU4FcoQGakQF.H.PF.XB.q..N.LD.KAvT.fE.cAfXAjR.tD.LAHS.0DvMAXT.IEvVDvMAgSv3DfN.......f.A..........F...................AwC"
									}
,
									"fileref" : 									{
										"name" : "H-Delay (s)",
										"filename" : "H-Delay (s)_20230214_2.maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "9a89758604256e5c84e1f7223541947c"
									}

								}
 ]
						}

					}
,
					"text" : "vst~ \"H-Delay (s).auinfo\"",
					"varname" : "vst~[2]",
					"viewvisibility" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-166",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 997.666695833206177, 1577.999998092651367, 100.0, 22.0 ],
					"text" : "pan2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-164",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1073.000029802322388, 1502.666664600372314, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-159",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 336.0, 390.0, 151.0, 22.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, "S1 Imager (s).auinfo", ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~[3]",
							"parameter_shortname" : "vst~[3]",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "S1 Imager (s).auinfo",
							"plugindisplayname" : "S1 Imager (s)",
							"pluginsavedname" : "",
							"pluginsaveduniqueid" : 1314080851,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"blob" : "1127.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPI..............DA.....DoG......DvP5C......BLj9......v.CoO......P..........E.........fA.........b..........H.........PB.........n..........K..........C.........z..........N.........vC..........A.....RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQHvz..f.SC...P....P.NMERSMWYzED..HvsXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhLERUYjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9LULfjTagcVYxwyKPwVcmklaNEVak4iBf.BH7.Ea0cVZtMUchMzasAmONMERSwyKPwVcmklaSUmXC8Vav4iBf.BH7.Ea0cVZtYUYxMWZu4lOwPiKv3BNy3BNzvyKPwVcmklaVUlbyk1at4iBf.BH7DzXzklckMUYzUGb9LUQTUETeEDOuDzXzklckMUYzUGb9n.Hf.BOL8VXj0TYtU2PgQWYm8lb44iQgMFcuIWd77BSuEFYMUla0MTXzU1YuIWd9n.Hf.BORUVXj8jarkmOzIWckwyKRUVXj8jarkmOJ.BH77BTxU1bkQGRkEFYkImOJ.BH7.kbkMWYzQTXzEFHSUFc0AWOhLUQTUETeEjH9n.Hf.BOPElbg0VYzUlbyABU4AWY8HhTkEFaW8lbrQlH9.CHw.RLfXSMv.BLf.CHp.hJfnBHpnfJf.CHv.BLf.CHv.BLf.CH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3CLfDCHw.hM0.CHv.BLfnBHp.hJfnhBp.BLf.CHv.BLf.CHv.BLfvyKPElbg0VYzUlby4iBf.BH7.Ea0cVZtMEbkMVZlk1XX0DSDEFcgAxK9n.HfvyKPIWYyUFcDEFcg4iBfvyKPIWYyUFc9n.Ou.kbkMWYzMDZ041ZX0DSTIWYk4iBR3zTHMED.HQX0YFdXUkazkFcrUFY.f..Y.fI.rB.3.vP.rD.SA.V.zE.hAP9.3e..Df.ATP.GDfEAjQ.qPf.Db.AIPfC........BD..........X...................DbA"
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "S1 Imager (s)",
									"origin" : "S1 Imager (s).auinfo",
									"type" : "AudioUnit",
									"subtype" : "AudioEffect",
									"embed" : 0,
									"snapshot" : 									{
										"pluginname" : "S1 Imager (s).auinfo",
										"plugindisplayname" : "S1 Imager (s)",
										"pluginsavedname" : "",
										"pluginsaveduniqueid" : 1314080851,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"blob" : "1127.hAGaoMGcv.C1AHv.DTfAGfPBJrvDTTgEWvUag4VclE1XzUmbkIGUjEFcgwUYrUVak4Fcs3VXsUlVWElckM2WXA0bzc0b0IFc4AWYWYWYxMWZu4FUzkGbkQkag0VYRr1bWY0SPPI..............DA.....DoG......DvP5C......BLj9......v.CoO......P..........E.........fA.........b..........H.........PB.........n..........K..........C.........z..........N.........vC..........A.....RyPCNDQTwDkLQ+.DQAiWMEVZtARRtAWczAhP0MWzOHwWP7PSgklaf7TczAWczAhP0M2SQHvz..f.SC...P....P.NMERSMWYzED..HvsXA0bzwCTxU1bkQ2PnUmaqgUSLQkbkUFH1Ulbyk1at0iHxHhOJ.BOPIWYyUFcf3TXsUVOhHBHGUlakIWZiQUdvUVOhLERUYjH9n.HfvCTxU1bkQGRkEFYkImOJ.BHfvCTrU2Yo4lSg0VY9LULfjTagcVYxwyKPwVcmklaNEVak4iBf.BH7.Ea0cVZtMUchMzasAmONMERSwyKPwVcmklaSUmXC8Vav4iBf.BH7.Ea0cVZtYUYxMWZu4lOwPiKv3BNy3BNzvyKPwVcmklaVUlbyk1at4iBf.BH7DzXzklckMUYzUGb9LUQTUETeEDOuDzXzklckMUYzUGb9n.Hf.BOL8VXj0TYtU2PgQWYm8lb44iQgMFcuIWd77BSuEFYMUla0MTXzU1YuIWd9n.Hf.BORUVXj8jarkmOzIWckwyKRUVXj8jarkmOJ.BH77BTxU1bkQGRkEFYkImOJ.BH7.kbkMWYzQTXzEFHSUFc0AWOhLUQTUETeEjH9n.Hf.BOPElbg0VYzUlbyABU4AWY8HhTkEFaW8lbrQlH9.CHw.RLfXSMv.BLf.CHp.hJfnBHpnfJf.CHv.BLf.CHv.BLf.CH77BTgIWXsUFckI2b9n.Hf.BOPwVcmklaSAWYiklYoMFVMwDQgQWXf7hOJ.BH77BTxU1bkQGQgQWX9n.HfvCTxU1bkQGQgQWXfLUYzUGb8HxTEQUUP8kPh3iBf.BH7.UXxEVakQWYxMGHTkGbk0iHRUVXrc0axwFYh3CLfDCHw.hM0.CHv.BLfnBHp.hJfnhBp.BLf.CHv.BLf.CHv.BLfvyKPElbg0VYzUlby4iBf.BH7.Ea0cVZtMEbkMVZlk1XX0DSDEFcgAxK9n.HfvyKPIWYyUFcDEFcg4iBfvyKPIWYyUFc9n.Ou.kbkMWYzMDZ041ZX0DSTIWYk4iBR3zTHMED.HQX0YFdXUkazkFcrUFY.f..Y.fI.rB.3.vP.rD.SA.V.zE.hAP9.3e..Df.ATP.GDfEAjQ.qPf.Db.AIPfC........BD..........X...................DbA"
									}
,
									"fileref" : 									{
										"name" : "S1 Imager (s)",
										"filename" : "S1 Imager (s).maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "68252a9d5e22d484dbd98a0601a3d2a4"
									}

								}
 ]
						}

					}
,
					"text" : "vst~ \"S1 Imager (s).auinfo\"",
					"varname" : "vst~[3]",
					"viewvisibility" : 0
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-151",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 39.666668295860291, 1228.666662812232971, 300.0, 100.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, "ValhallaVintageVerb.auinfo", ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~[1]",
							"parameter_shortname" : "vst~[1]",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "ValhallaVintageVerb.auinfo",
							"plugindisplayname" : "ValhallaVintageVerb",
							"pluginsavedname" : "",
							"pluginsaveduniqueid" : 1986356531,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"sliderorder" : [  ],
							"slidervisibility" : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
							"blob" : "826.hAGaoMGcv.y0AHv.DTfAGfPBJr.CM3.WsEla0YVXiQWcxUlbTQVXzE1UyUmXzkGbkckckI2bo8laeAwCpU2XkAEa0cVZtMEcgQWYTQWdvUFUtEVakIwaDklaOAAk..............PD..............P..........H..........C..........A.........T..........F.........vA.........f..........I.........fB.........r..........L.........PC.........3..........O..........D.....HgckU1LP.vSQDf9VMjLgDe....OVEFanEFarElUo4FcgcVYVUlbhABbrU2Yo4lUkI2bo8la8HRLtbiKwHBHvIWYyUFcNEVak0iHDUlYgUGazIBHMkFd8HRLh.BTxUFQkwVX40iHv3hL0HBHDU1XgkWOh.iKzHCLzfCLyDCL4DiM4.CL1LCM2biHfLUZ5UVOhDiHfDDczE1Xq0iHvHBHBE1by0TcrQWOh.iK1HyLvLCN2XCN2XCNyDCL0PiM3fiHfHTXyMGVuYWYx0iHv3BMzPyMvDSLvTyL0XiLwXCMy.iM1HBHHk1YnMEZkwlY8HBLh.BRocFZFIWYw0iHv3RMh.RQgIGa4QTZlYVcyk1at0iHwHBHLEFckQTZlYVcyk1at0iHwHBHM8FYREFck0iHv3hLzTCM0PSM1PiM4.SM3jSNvPyM4HBHM8FYDUFbzgVOh.iKyDSN2bSMz.iL0PSM4HCN4TSMvfiHffTZmg1P0QWOh.iK0jCL0LCN3TSNyXyMybCL1.SMzbiHfvza2MTcz0iHvHBHC8FauIWSuQVY8HBLtLyLyLyLyLCMyHiM2PCMvbSN0jiHfHUY1Ulbh0zajUVOh.iKyjSMwXiMv.SN1XCM0LSM0HiLzXiHfzVZ3wzaisVOh.iHfTWZWkFYzgVOhjyL0HBH0kFRkk1YnQWOhPyL0HxK9.fDgUmY3AE.H.vE.PB.o.PL.jC.KA.T.TE.ZAP7.XO.3Kf8BrO.......f.A.........vC..................f.7C"
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "ValhallaVintageVerb",
									"origin" : "ValhallaVintageVerb.auinfo",
									"type" : "AudioUnit",
									"subtype" : "AudioEffect",
									"embed" : 0,
									"snapshot" : 									{
										"pluginname" : "ValhallaVintageVerb.auinfo",
										"plugindisplayname" : "ValhallaVintageVerb",
										"pluginsavedname" : "",
										"pluginsaveduniqueid" : 1986356531,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"sliderorder" : [  ],
										"slidervisibility" : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
										"blob" : "826.hAGaoMGcv.y0AHv.DTfAGfPBJr.CM3.WsEla0YVXiQWcxUlbTQVXzE1UyUmXzkGbkckckI2bo8laeAwCpU2XkAEa0cVZtMEcgQWYTQWdvUFUtEVakIwaDklaOAAk..............PD..............P..........H..........C..........A.........T..........F.........vA.........f..........I.........fB.........r..........L.........PC.........3..........O..........D.....HgckU1LP.vSQDf9VMjLgDe....OVEFanEFarElUo4FcgcVYVUlbhABbrU2Yo4lUkI2bo8la8HRLtbiKwHBHvIWYyUFcNEVak0iHDUlYgUGazIBHMkFd8HRLh.BTxUFQkwVX40iHv3hL0HBHDU1XgkWOh.iKzHCLzfCLyDCL4DiM4.CL1LCM2biHfLUZ5UVOhDiHfDDczE1Xq0iHvHBHBE1by0TcrQWOh.iK1HyLvLCN2XCN2XCNyDCL0PiM3fiHfHTXyMGVuYWYx0iHv3BMzPyMvDSLvTyL0XiLwXCMy.iM1HBHHk1YnMEZkwlY8HBLh.BRocFZFIWYw0iHv3RMh.RQgIGa4QTZlYVcyk1at0iHwHBHLEFckQTZlYVcyk1at0iHwHBHM8FYREFck0iHv3hLzTCM0PSM1PiM4.SM3jSNvPyM4HBHM8FYDUFbzgVOh.iKyDSN2bSMz.iL0PSM4HCN4TSMvfiHffTZmg1P0QWOh.iK0jCL0LCN3TSNyXyMybCL1.SMzbiHfvza2MTcz0iHvHBHC8FauIWSuQVY8HBLtLyLyLyLyLCMyHiM2PCMvbSN0jiHfHUY1Ulbh0zajUVOh.iKyjSMwXiMv.SN1XCM0LSM0HiLzXiHfzVZ3wzaisVOh.iHfTWZWkFYzgVOhjyL0HBH0kFRkk1YnQWOhPyL0HxK9.fDgUmY3AE.H.vE.PB.o.PL.jC.KA.T.TE.ZAP7.XO.3Kf8BrO.......f.A.........vC..................f.7C"
									}
,
									"fileref" : 									{
										"name" : "ValhallaVintageVerb",
										"filename" : "ValhallaVintageVerb_20230213.maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "80fe929166e3dcebfca44dfd8e1246e2"
									}

								}
 ]
						}

					}
,
					"text" : "vst~ ValhallaVintageVerb.auinfo",
					"varname" : "vst~[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-150",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 336.0, 390.0, 177.0, 22.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, "ValhallaVintageVerb.auinfo", ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~",
							"parameter_shortname" : "vst~",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "ValhallaVintageVerb.auinfo",
							"plugindisplayname" : "ValhallaVintageVerb",
							"pluginsavedname" : "",
							"pluginsaveduniqueid" : 1986356531,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"blob" : "837.hAGaoMGcv.y0AHv.DTfAGfPBJr.CM3.WsEla0YVXiQWcxUlbTQVXzE1UyUmXzkGbkckckI2bo8laeAwCpU2XkAEa0cVZtMEcgQWYTQWdvUFUtEVakIwaDklaOAAk..............PD..............P..........H..........C..........A.........T..........F.........vA.........f..........I.........fB.........r..........L.........PC.........3..........O..........D.....HgckU1LP.vSQDP+VMjLgPe....OVEFanEFarElUo4FcgcVYVUlbhABbrU2Yo4lUkI2bo8la8HRLtbiKwHBHvIWYyUFcNEVak0iHDUlYgUGazIBHMkFd8HRLh.BTxUFQkwVX40iHv3hL0HBHDU1XgkWOh.iKzHCLzfCLyDCL4DiM4.CL1LCM2biHfLUZ5UVOhDiHfDDczE1Xq0iHv3RMh.hPgM2bMUGaz0iHv3hMxLCLyfyM1fyM1fyLw.SMzXCN3HBHBE1byg0a1Ulb8HBLtPCMzbCLwDCL0LSM1HSL1PyLvXiMh.BRocFZSgVYrYVOh.iHffTZmglQxUVb8HBLtTiHfTTXxwVdDklYlU2bo8la8HRLh.BSgQWYDklYlU2bo8la8HRLh.RSuQlTgQWY8HBLtHCM0PSMzTiMzXSNvTCN4jCLzbSNh.RSuQFQkAGcn0iHv3xL2jSN4jSN4TiLyDiMxfCMwbSN2HBHHk1YnMTcz0iHv3RM4.SMyfCN0jyL1byL2.iMvTCM2HBHL81cCUGc8HBLh.xPuw1ax0zajUVOh.iKyLyLyLyLyPyLxXyMzPCL2jSM4HBHRUlckImXM8FYk0iHv3BLzDiM1XiM1bSNvfCMy.CL4jCM3biHfzVZ3wzaisVOh.iHfTWZWkFYzgVOhjyL0HBH0kFRkk1YnQWOhPyL0HxK9.fDgUmY3gUUtQWZzwVYjA.B.bA.j.PJ.DC.4.vR..E.UAfV.DO.1C.9Bju.9C.......HP..........7...................LvA"
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "ValhallaVintageVerb",
									"origin" : "ValhallaVintageVerb.auinfo",
									"type" : "AudioUnit",
									"subtype" : "AudioEffect",
									"embed" : 0,
									"snapshot" : 									{
										"pluginname" : "ValhallaVintageVerb.auinfo",
										"plugindisplayname" : "ValhallaVintageVerb",
										"pluginsavedname" : "",
										"pluginsaveduniqueid" : 1986356531,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"blob" : "837.hAGaoMGcv.y0AHv.DTfAGfPBJr.CM3.WsEla0YVXiQWcxUlbTQVXzE1UyUmXzkGbkckckI2bo8laeAwCpU2XkAEa0cVZtMEcgQWYTQWdvUFUtEVakIwaDklaOAAk..............PD..............P..........H..........C..........A.........T..........F.........vA.........f..........I.........fB.........r..........L.........PC.........3..........O..........D.....HgckU1LP.vSQDP+VMjLgPe....OVEFanEFarElUo4FcgcVYVUlbhABbrU2Yo4lUkI2bo8la8HRLtbiKwHBHvIWYyUFcNEVak0iHDUlYgUGazIBHMkFd8HRLh.BTxUFQkwVX40iHv3hL0HBHDU1XgkWOh.iKzHCLzfCLyDCL4DiM4.CL1LCM2biHfLUZ5UVOhDiHfDDczE1Xq0iHv3RMh.hPgM2bMUGaz0iHv3hMxLCLyfyM1fyM1fyLw.SMzXCN3HBHBE1byg0a1Ulb8HBLtPCMzbCLwDCL0LSM1HSL1PyLvXiMh.BRocFZSgVYrYVOh.iHffTZmglQxUVb8HBLtTiHfTTXxwVdDklYlU2bo8la8HRLh.BSgQWYDklYlU2bo8la8HRLh.RSuQlTgQWY8HBLtHCM0PSMzTiMzXSNvTCN4jCLzbSNh.RSuQFQkAGcn0iHv3xL2jSN4jSN4TiLyDiMxfCMwbSN2HBHHk1YnMTcz0iHv3RM4.SMyfCN0jyL1byL2.iMvTCM2HBHL81cCUGc8HBLh.xPuw1ax0zajUVOh.iKyLyLyLyLyPyLxXyMzPCL2jSM4HBHRUlckImXM8FYk0iHv3BLzDiM1XiM1bSNvfCMy.CL4jCM3biHfzVZ3wzaisVOh.iHfTWZWkFYzgVOhjyL0HBH0kFRkk1YnQWOhPyL0HxK9.fDgUmY3gUUtQWZzwVYjA.B.bA.j.PJ.DC.4.vR..E.UAfV.DO.1C.9Bju.9C.......HP..........7...................LvA"
									}
,
									"fileref" : 									{
										"name" : "ValhallaVintageVerb",
										"filename" : "ValhallaVintageVerb_20230213_1.maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "16be9f28d381f76b6fb63d05f8d6e366"
									}

								}
 ]
						}

					}
,
					"text" : "vst~ ValhallaVintageVerb.auinfo",
					"varname" : "vst~",
					"viewvisibility" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-149",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 213.999998807907104, 953.333361744880676, 100.0, 40.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-146",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 451.750003457069397, 1072.0000319480896, 50.0, 22.0 ],
					"text" : "0 3 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-143",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 307.250003457069397, 1072.0000319480896, 50.0, 22.0 ],
					"text" : "0 2 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-141",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 165.750003457069397, 1072.0000319480896, 50.0, 22.0 ],
					"text" : "0 1 $1"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-139",
					"maxclass" : "flonum",
					"maximum" : 1.0,
					"minimum" : 0.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 451.750003457069397, 1037.333364248275757, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-138",
					"maxclass" : "flonum",
					"maximum" : 1.0,
					"minimum" : 0.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 307.250003457069397, 1037.333364248275757, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-137",
					"maxclass" : "flonum",
					"maximum" : 1.0,
					"minimum" : 0.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 165.750003457069397, 1037.333364248275757, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-136",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 45.416668176651001, 1072.0000319480896, 50.0, 22.0 ],
					"text" : "0 0 $1"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-134",
					"maxclass" : "flonum",
					"maximum" : 1.0,
					"minimum" : 0.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 45.416668176651001, 1037.333364248275757, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-131",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 446.750003457069397, 1193.336668415069653, 80.0, 13.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-130",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 303.916675567626953, 1193.336668415069653, 80.0, 13.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-129",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 159.666671872138977, 1193.336668415069653, 80.0, 13.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-127",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "signal", "signal", "signal", "signal", "list" ],
					"patching_rect" : [ 15.416668176651001, 1133.333337187767029, 596.000014781951904, 22.0 ],
					"text" : "matrix~ 1 4 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"hidden" : 1,
					"id" : "obj-10",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 308.50000011920929, 868.166682124137878, 48.0, 23.0 ],
					"text" : "set $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"hidden" : 1,
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 247.666666785876032, 868.166682124137878, 48.0, 23.0 ],
					"text" : "set $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"hidden" : 1,
					"id" : "obj-108",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 190.833333452542547, 868.166682124137878, 48.0, 23.0 ],
					"text" : "set $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-109",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 134.00000011920929, 828.666682124137878, 360.0, 23.0 ],
					"text" : "0.336652 0.673305 0.336652 0.333103 0.039943"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"format" : 6,
					"id" : "obj-110",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 448.00000011920929, 618.666682124137878, 55.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"format" : 6,
					"id" : "obj-111",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 368.00000011920929, 618.666682124137878, 55.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"format" : 6,
					"id" : "obj-75",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 278.00000011920929, 618.666682124137878, 57.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"id" : "obj-112",
					"linmarkers" : [ 0.0, 11025.0, 16537.5 ],
					"logmarkers" : [ 0.0, 100.0, 1000.0, 10000.0 ],
					"maxclass" : "filtergraph~",
					"nfilters" : 1,
					"numinlets" : 8,
					"numoutlets" : 7,
					"outlettype" : [ "list", "float", "float", "float", "float", "list", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 134.00000011920929, 656.166682124137878, 360.0, 155.0 ],
					"setfilter" : [ 0, 1, 1, 0, 0, 14490.8828125, 0.980745613574982, 0.513069272041321, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
					"varname" : "filtergraph~"
				}

			}
, 			{
				"box" : 				{
					"attr" : "edit_mode",
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-12",
					"lock" : 1,
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"orientation" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 134.00000011920929, 605.166682124137878, 83.0, 46.0 ],
					"text_width" : 83.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-113",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 12.333333134651184, 847.333349347114563, 100.0, 22.0 ],
					"text" : "biquad~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-107",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 67.999998092651367, 164.66999988079067, 100.0, 40.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-106",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 608.999996423721313, 145.3300009536743, 100.0, 40.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-103",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 854.333351969718933, 108.663333730697616, 100.0, 40.0 ],
					"preset_data" : [ 						{
							"number" : 1,
							"data" : [ 5, "obj-102", "flonum", "float", 5.0, 5, "obj-101", "flonum", "float", 4.0, 5, "obj-100", "flonum", "float", 3.0, 5, "obj-99", "flonum", "float", 2.0 ]
						}
 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-102",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1392.333353519439697, 233.333340287208557, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-101",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1064.0000079870224, 233.333340287208557, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-100",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 749.0, 233.333340287208557, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-99",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 453.666680932044983, 229.333340167999268, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-95",
					"items" : [ "Off", ",", "Sine", ",", "Saw", ",", "Tri", ",", "Rect" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1004.333341956138611, 369.333344340324402, 46.33333158493042, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-96",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 106.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-9",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 50.0, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 219.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 136.669999999999959, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-86",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 370.836695952415425, 100.0, 59.0, 22.0 ],
									"text" : "rect~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-85",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 286.836693449020345, 100.0, 55.0, 22.0 ],
									"text" : "tri~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-84",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 208.500003874301797, 100.0, 43.0, 22.0 ],
									"text" : "saw~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-83",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 136.669999999999959, 100.0, 43.0, 22.0 ],
									"text" : "cycle~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-82",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 50.0, 149.330000000000041, 360.000007748603707, 22.0 ],
									"text" : "selector~ 4"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-83", 0 ],
									"order" : 3,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-84", 0 ],
									"order" : 2,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-85", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-86", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-82", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 1 ],
									"source" : [ "obj-83", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 2 ],
									"source" : [ "obj-84", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 3 ],
									"source" : [ "obj-85", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 4 ],
									"source" : [ "obj-86", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 1004.333341956138611, 412.003341121673543, 70.66666579246521, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p osc"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-93",
					"items" : [ "Off", ",", "Sine", ",", "Saw", ",", "Tri", ",", "Rect" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1305.666674137115479, 371.99667652130131, 46.33333158493042, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 106.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-9",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 50.0, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 219.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 136.669999999999959, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-86",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 370.836695952415425, 100.0, 59.0, 22.0 ],
									"text" : "rect~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-85",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 286.836693449020345, 100.0, 55.0, 22.0 ],
									"text" : "tri~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-84",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 208.500003874301797, 100.0, 43.0, 22.0 ],
									"text" : "saw~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-83",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 136.669999999999959, 100.0, 43.0, 22.0 ],
									"text" : "cycle~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-82",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 50.0, 149.330000000000041, 360.000007748603707, 22.0 ],
									"text" : "selector~ 4"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-83", 0 ],
									"order" : 3,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-84", 0 ],
									"order" : 2,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-85", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-86", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-82", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 1 ],
									"source" : [ "obj-83", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 2 ],
									"source" : [ "obj-84", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 3 ],
									"source" : [ "obj-85", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 4 ],
									"source" : [ "obj-86", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 1305.666674137115479, 414.666673302650452, 70.66666579246521, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p osc"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-91",
					"items" : [ "Off", ",", "Sine", ",", "Saw", ",", "Tri", ",", "Rect" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 662.666664838790894, 369.333344340324402, 46.33333158493042, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 106.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-9",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 50.0, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 219.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 136.669999999999959, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-86",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 370.836695952415425, 100.0, 59.0, 22.0 ],
									"text" : "rect~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-85",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 286.836693449020345, 100.0, 55.0, 22.0 ],
									"text" : "tri~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-84",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 208.500003874301797, 100.0, 43.0, 22.0 ],
									"text" : "saw~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-83",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 136.669999999999959, 100.0, 43.0, 22.0 ],
									"text" : "cycle~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-82",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 50.0, 149.330000000000041, 360.000007748603707, 22.0 ],
									"text" : "selector~ 4"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-83", 0 ],
									"order" : 3,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-84", 0 ],
									"order" : 2,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-85", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-86", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-82", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 1 ],
									"source" : [ "obj-83", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 2 ],
									"source" : [ "obj-84", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 3 ],
									"source" : [ "obj-85", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 4 ],
									"source" : [ "obj-86", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 662.666664838790894, 412.003341121673543, 70.66666579246521, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p osc"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-89",
					"items" : [ "Off", ",", "Sine", ",", "Saw", ",", "Tri", ",", "Rect" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 347.666664838790894, 371.99667652130131, 46.33333158493042, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-90",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 106.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-9",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 50.0, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 219.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 136.669999999999959, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-86",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 370.836695952415425, 100.0, 59.0, 22.0 ],
									"text" : "rect~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-85",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 286.836693449020345, 100.0, 55.0, 22.0 ],
									"text" : "tri~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-84",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 208.500003874301797, 100.0, 43.0, 22.0 ],
									"text" : "saw~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-83",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 136.669999999999959, 100.0, 43.0, 22.0 ],
									"text" : "cycle~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-82",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 50.0, 149.330000000000041, 360.000007748603707, 22.0 ],
									"text" : "selector~ 4"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-83", 0 ],
									"order" : 3,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-84", 0 ],
									"order" : 2,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-85", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-86", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-82", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 1 ],
									"source" : [ "obj-83", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 2 ],
									"source" : [ "obj-84", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 3 ],
									"source" : [ "obj-85", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 4 ],
									"source" : [ "obj-86", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 347.666664838790894, 414.666673302650452, 70.66666579246521, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p osc"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"items" : [ "Off", ",", "Sine", ",", "Saw", ",", "Tri", ",", "Rect" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 16.666664838790894, 371.99667652130131, 46.33333158493042, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-87",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 106.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-9",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 50.0, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 219.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 136.669999999999959, 51.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-86",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 370.836695952415425, 100.0, 59.0, 22.0 ],
									"text" : "rect~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-85",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 286.836693449020345, 100.0, 55.0, 22.0 ],
									"text" : "tri~ 0.5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-84",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 208.500003874301797, 100.0, 43.0, 22.0 ],
									"text" : "saw~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-83",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 136.669999999999959, 100.0, 43.0, 22.0 ],
									"text" : "cycle~"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-82",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 50.0, 149.330000000000041, 360.000007748603707, 22.0 ],
									"text" : "selector~ 4"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-83", 0 ],
									"order" : 3,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-84", 0 ],
									"order" : 2,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-85", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-86", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-82", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 1 ],
									"source" : [ "obj-83", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 2 ],
									"source" : [ "obj-84", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 3 ],
									"source" : [ "obj-85", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 4 ],
									"source" : [ "obj-86", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-82", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 16.666664838790894, 414.666673302650452, 70.66666579246521, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p osc"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 374.5, 168.00333575725557, 100.0, 22.0 ],
					"text" : "/ 127."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1530.000038027763367, 342.666676878929138, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-71",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1488.000044345855713, 373.333344459533691, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1468.66670286655426, 342.666676878929138, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1429.333375930786133, 373.333344459533691, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "signal", "", "" ],
					"patching_rect" : [ 1418.66670286655426, 418.666673421859741, 100.0, 22.0 ],
					"text" : "adsr~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1206.000028371810913, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-66",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1164.000034689903259, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1144.666693210601807, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1105.333366274833679, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "signal", "", "" ],
					"patching_rect" : [ 1094.666693210601807, 414.666673302650452, 100.0, 22.0 ],
					"text" : "adsr~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-60",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 879.333351969718933, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-61",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 837.333358287811279, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 818.000016808509827, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 778.666689872741699, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "signal", "", "" ],
					"patching_rect" : [ 768.000016808509827, 414.666673302650452, 100.0, 22.0 ],
					"text" : "adsr~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 562.000009179115295, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-56",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 520.000015497207642, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-57",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 500.666674017906189, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 461.333347082138062, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-59",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "signal", "", "" ],
					"patching_rect" : [ 450.666674017906189, 414.666673302650452, 100.0, 22.0 ],
					"text" : "adsr~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-52",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 275.333333969116211, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-51",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 233.333340287208557, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 213.999998807907104, 338.666676759719849, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 174.666671872138977, 369.333344340324402, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "signal", "", "" ],
					"patching_rect" : [ 163.999998807907104, 414.666673302650452, 100.0, 22.0 ],
					"text" : "adsr~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1375.000019669532776, 258.670002145767171, 30.666664600372258, 22.0 ],
					"text" : "* 5."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1052.333343386650085, 258.670002145767171, 30.666664600372258, 22.0 ],
					"text" : "* 4."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 736.333333969116211, 262.670002264976461, 30.666664600372258, 22.0 ],
					"text" : "* 3."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 415.996666269302352, 262.670002264976461, 30.666664600372258, 22.0 ],
					"text" : "* 2."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1305.666674137115479, 536.33333683013916, 100.0, 22.0 ],
					"text" : "send~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1305.666674137115479, 477.33333683013916, 38.0, 22.0 ],
					"text" : "*~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 993.666664838790894, 536.33333683013916, 100.0, 22.0 ],
					"text" : "send~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 993.666664838790894, 477.33333683013916, 38.0, 22.0 ],
					"text" : "*~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 662.666664838790894, 536.33333683013916, 100.0, 22.0 ],
					"text" : "send~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 662.666664838790894, 477.33333683013916, 38.0, 22.0 ],
					"text" : "*~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 347.666664838790894, 536.33333683013916, 100.0, 22.0 ],
					"text" : "send~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 347.666664838790894, 477.33333683013916, 38.0, 22.0 ],
					"text" : "*~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 47.833333134651184, 1674.333362460136414, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 12.333333134651184, 787.333339691162109, 116.0, 22.0 ],
					"text" : "receive~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 16.666664838790894, 536.33333683013916, 100.0, 22.0 ],
					"text" : "send~ SynthOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 16.666664838790894, 477.33333683013916, 38.0, 22.0 ],
					"text" : "*~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4.0, 173.66999988079067, 41.0, 22.0 ],
					"text" : "mtof"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-110", 0 ],
					"hidden" : 1,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 1 ],
					"source" : [ "obj-100", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 1 ],
					"source" : [ "obj-101", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 1 ],
					"source" : [ "obj-102", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-100", 0 ],
					"midpoints" : [ 863.833351969718933, 147.666670143604279, 758.5, 147.666670143604279 ],
					"order" : 2,
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-101", 0 ],
					"midpoints" : [ 863.833351969718933, 147.666670143604279, 1073.5000079870224, 147.666670143604279 ],
					"order" : 1,
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-102", 0 ],
					"midpoints" : [ 863.833351969718933, 147.666670143604279, 1401.833353519439697, 147.666670143604279 ],
					"order" : 0,
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-99", 0 ],
					"midpoints" : [ 863.833351969718933, 215.000005483627319, 463.166680932044983, 215.000005483627319 ],
					"order" : 3,
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 184.166671872138977, 212.831671872138969 ],
					"order" : 19,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 223.499998807907104, 197.498338081836692 ],
					"order" : 18,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 242.833340287208557, 212.831671872138969 ],
					"order" : 17,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 284.833333969116211, 197.498338081836692 ],
					"order" : 16,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 571.500009179115295, 197.498338081836692 ],
					"order" : 12,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 529.500015497207642, 212.831671872138969 ],
					"order" : 13,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 510.166674017906189, 197.498338081836692 ],
					"order" : 14,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-58", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 470.833347082138062, 212.831671872138969 ],
					"order" : 15,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-60", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 888.833351969718933, 197.498338081836692 ],
					"order" : 8,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-61", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 846.833358287811279, 212.831671872138969 ],
					"order" : 9,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 827.500016808509827, 197.498338081836692 ],
					"order" : 10,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 788.166689872741699, 212.831671872138969 ],
					"order" : 11,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 1215.500028371810913, 197.498338081836692 ],
					"order" : 4,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 1173.500034689903259, 212.831671872138969 ],
					"order" : 5,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"midpoints" : [ 618.499996423721313, 197.498338081836692, 1154.166693210601807, 197.498338081836692 ],
					"order" : 6,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"midpoints" : [ 618.499996423721313, 212.831671872138969, 1114.833366274833679, 212.831671872138969 ],
					"order" : 7,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"midpoints" : [ 618.499996423721313, 199.498338141441337, 1539.500038027763367, 199.498338141441337 ],
					"order" : 0,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"midpoints" : [ 618.499996423721313, 214.831671931743614, 1497.500044345855713, 214.831671931743614 ],
					"order" : 1,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-72", 0 ],
					"midpoints" : [ 618.499996423721313, 199.498338141441337, 1478.16670286655426, 199.498338141441337 ],
					"order" : 2,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"midpoints" : [ 618.499996423721313, 214.831671931743614, 1438.833375930786133, 214.831671931743614 ],
					"order" : 3,
					"source" : [ "obj-106", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-88", 0 ],
					"midpoints" : [ 77.499998092651367, 287.83333820104599, 26.166664838790894, 287.83333820104599 ],
					"order" : 4,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-89", 0 ],
					"midpoints" : [ 77.499998092651367, 287.83333820104599, 357.166664838790894, 287.83333820104599 ],
					"order" : 3,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-91", 0 ],
					"midpoints" : [ 77.499998092651367, 286.501672110557536, 672.166664838790894, 286.501672110557536 ],
					"order" : 2,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-93", 0 ],
					"midpoints" : [ 77.499998092651367, 287.83333820104599, 1315.166674137115479, 287.83333820104599 ],
					"order" : 0,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-95", 0 ],
					"midpoints" : [ 77.499998092651367, 286.501672110557536, 1013.833341956138611, 286.501672110557536 ],
					"order" : 1,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-75", 0 ],
					"hidden" : 1,
					"source" : [ "obj-108", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-112", 7 ],
					"source" : [ "obj-110", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-112", 6 ],
					"source" : [ "obj-111", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"hidden" : 1,
					"source" : [ "obj-112", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"hidden" : 1,
					"source" : [ "obj-112", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-109", 1 ],
					"order" : 0,
					"source" : [ "obj-112", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-113", 0 ],
					"order" : 1,
					"source" : [ "obj-112", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"hidden" : 1,
					"source" : [ "obj-112", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-113", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-112", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-129", 0 ],
					"order" : 0,
					"source" : [ "obj-127", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-130", 0 ],
					"order" : 1,
					"source" : [ "obj-127", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-131", 0 ],
					"source" : [ "obj-127", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-151", 0 ],
					"order" : 1,
					"source" : [ "obj-127", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-170", 0 ],
					"order" : 0,
					"source" : [ "obj-127", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 1 ],
					"order" : 0,
					"source" : [ "obj-127", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"order" : 1,
					"source" : [ "obj-127", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-136", 0 ],
					"source" : [ "obj-134", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-136", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-141", 0 ],
					"source" : [ "obj-137", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-143", 0 ],
					"source" : [ "obj-138", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-146", 0 ],
					"source" : [ "obj-139", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-141", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-143", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-146", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-166", 2 ],
					"source" : [ "obj-164", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 1 ],
					"source" : [ "obj-170", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-170", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-174", 1 ],
					"source" : [ "obj-173", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-174", 0 ],
					"source" : [ "obj-173", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-176", 0 ],
					"source" : [ "obj-174", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-176", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-176", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"midpoints" : [ 13.5, 211.335001728534678, 425.496666269302352, 211.335001728534678 ],
					"order" : 3,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"midpoints" : [ 13.5, 211.335001728534678, 745.833333969116211, 211.335001728534678 ],
					"order" : 2,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 13.5, 212.00166841506956, 1061.833343386650085, 212.00166841506956 ],
					"order" : 1,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"midpoints" : [ 13.5, 214.668335161209086, 1384.500019669532776, 214.668335161209086 ],
					"order" : 0,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-87", 1 ],
					"order" : 4,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-90", 1 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 1 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-96", 1 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-94", 1 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 1 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 2 ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 3 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 4 ],
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 4 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 3 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 2 ],
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 1 ],
					"source" : [ "obj-58", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-113", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 4 ],
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 3 ],
					"source" : [ "obj-61", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 2 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 1 ],
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 4 ],
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 3 ],
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 2 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 1 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 4 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 3 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 2 ],
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 1 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-112", 5 ],
					"source" : [ "obj-75", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"midpoints" : [ 384.0, 259.835003278255442, 173.499998807907104, 259.835003278255442 ],
					"order" : 4,
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"midpoints" : [ 384.0, 259.835003278255442, 460.166674017906189, 259.835003278255442 ],
					"order" : 3,
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"midpoints" : [ 384.0, 259.835003278255442, 777.500016808509827, 259.835003278255442 ],
					"order" : 2,
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"midpoints" : [ 384.0, 259.835003278255442, 1104.166693210601807, 259.835003278255442 ],
					"order" : 1,
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"midpoints" : [ 384.0, 261.835003337860087, 1428.16670286655426, 261.835003337860087 ],
					"order" : 0,
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 1 ],
					"source" : [ "obj-87", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-87", 0 ],
					"source" : [ "obj-88", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-90", 0 ],
					"source" : [ "obj-89", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-111", 0 ],
					"hidden" : 1,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 1 ],
					"source" : [ "obj-90", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"source" : [ "obj-91", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 1 ],
					"source" : [ "obj-92", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-93", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 1 ],
					"source" : [ "obj-94", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-96", 0 ],
					"source" : [ "obj-95", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 1 ],
					"source" : [ "obj-96", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 1 ],
					"source" : [ "obj-99", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-170" : [ "vst~[4]", "vst~[4]", 0 ],
			"obj-151" : [ "vst~[1]", "vst~[1]", 0 ],
			"obj-169" : [ "vst~[2]", "vst~[2]", 0 ],
			"obj-159" : [ "vst~[3]", "vst~[3]", 0 ],
			"obj-150" : [ "vst~", "vst~", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "ValhallaVintageVerb_20230213_1.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "ValhallaVintageVerb_20230213.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "S1 Imager (s).maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "pan2.maxpat",
				"bootpath" : "~/Library/Application Support/Cycling '74/Max 8/Examples/spatialization/panning/lib",
				"patcherrelativepath" : "../../../../Library/Application Support/Cycling '74/Max 8/Examples/spatialization/panning/lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "H-Delay (s)_20230214_2.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "H-Delay (s)_20230214_1.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
