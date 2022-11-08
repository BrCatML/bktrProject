export default {
    incidents: {
        "SKHP_Action_NTHK_{event.camera}": {
            position: {
                x: -33.61605,
                y: -99.1739,
            },
            during: {
                delay: 1.0,
                event: "person_action_nthk",
                interval: 10.0,
            },
            start: {
                delay: 1.0,
                interval: 1.0,
            },
        },
        "SKHP_Action_Sibur_{event.camera}": {
            position: {
                x: 150.26046,
                y: -98.73289,
            },
            during: {
                event: "person_action_sibur",
                interval: 10.0,
            },
        },
        SKHP_T0_NoAction: {
            position: {
                x: 49.49525,
                y: 267.23519,
            },
            during: {
                incident: "/SKHP_T0_NoAction_.*/",
                interval: 0.0,
            },
            end: {
                incident: "/SKHP_T1_TrainIn_.*/",
            },
        },
        "SKHP_T0_NoAction_{event.camera}": {
            position: {
                x: 326.11302,
                y: -98.74525,
            },
            during: {
                event: "no_action_case",
                interval: 60.0,
                delay: 60,
            },
        },
        SKHP_T1_TrainIn: {
            position: {
                x: 170,
                y: 500,
            },
            during: {},
            end: {
                incident: "/SKHP_T2_BridgeDown_.*/",
                timeout: 360000.0,
            },
            start: {
                incident: "!SKHP_T0_NoAction",
            },
        },
        "SKHP_T1_TrainIn_{event.camera}": {
            position: {
                x: 264.44469,
                y: 158.76524,
            },
            during: {},
            end: {
                incident: "/^BridgeDown_{event.camera}|SKHP_T0_NoAction_{event.camera}|SKHP_MES_PIPE_ON/",
                timeout: 36000.0,
            },
            start: {
                incident: "!/SKHP_T0_NoAction_.*/",
                interval: 0.0,
            },
        },
        SKHP_T2_BridgeDown: {
            position: {
                x: 400.86455,
                y: 779.83448,
            },
            end: {
                incident: "/SKHP_T3_.*/",
                timeout: 36000.0,
            },
            start: {
                incident: "!SKHP_T1_TrainIn",
            },
        },
        "SKHP_T2_BridgeDown_{incident.first_event.camera}": {
            position: {
                x: 317.61324,
                y: 269.95862,
            },
            value: "{incident.first_event.camera}",
            end: {
                incident: "/SKHP_MES_PIPE_ON|SKHP_T0_NoAction_{event.camera}/",
                timeout: 36000.0,
            },
            start: {
                incident: "!/SKHP_T1_TrainIn_.*/",
                interval: 0.0,
            },
        },
        SKHP_T3_Liquid: {
            position: {
                x: 561.76938,
                y: 601.48082,
            },
            during: {
                incident: "/SKHP_T3_Liquid_.*/",
                interval: 0.0,
            },
        },
        "SKHP_T3_Liquid_{incident.value}": {
            position: {
                x: 510,
                y: 371.35779,
            },
            value: "{incident.value}",
            during: {},
            end: {
                incident: "/!SKHP_MES_PIPE_ON|SKHP_T0_NoAction_{event.camera}/",
                timeout: 36000.0,
            },
            start: {
                incident: "!/SKHP_T2_BridgeDown_.*/",
            },
        },
        SKHP_T4_BridgeUp: {
            position: {
                x: 693.99172,
                y: 834.32055,
            },
            start: {
                incident: "!SKHP_T3_Liquid",
            },
            end: {
                incident: "SKHP_T5_TrainOut",
                timeout: 36000,
            },
        },
        "SKHP_T4_BridgeUp_{incident.value}": {
            position: {
                x: 815.02069,
                y: 474.15614,
            },
            value: "{incident.value}",
            during: {},
            end: {
                incident: "/^BridgeNotUp_{incident.value}|SKHP_T0_NoAction_{incident.value}/",
                timeout: 36000.0,
            },
            start: {
                incident: "!/SKHP_T3_Liquid_.*/",
            },
        },
        SKHP_T5_TrainOut: {
            position: {
                x: 942.34538,
                y: 689.54703,
            },
            during: {
                incident: "/SKHP_T5_TrainOut_.*/",
                interval: 0.0,
            },
        },
        "SKHP_T5_TrainOut_{incident.value}": {
            position: {
                x: 1222.17986,
                y: 557.366,
            },
            during: {},
            end: {
                event: "{incident.value}:no_action_case",
                incident: "SKHP_T0_NoAction_{incident.value}",
                timeout: 36000.0,
            },
            start: {
                incident: "!/SKHP_T4_BridgeUp_.*/",
            },
        },
        "TrainInOut_{event.camera}": {
            position: {
                x: 694.33203,
                y: 371.9769,
            },
            during: {
                delay: 20.0,
                event: "train_in_out_case",
                interval: 30.0,
            },
            end: {
                incident: "SKHP_T0_NoAction_{event.camera}",
            },
        },
        "BridgeDown_{event.camera}": {
            position: {
                x: 903.16855,
                y: -26.58428,
            },
            during: {
                delay: 60.0,
                event: "bridge_down_case",
                interval: 30.0,
            },
        },
        "BridgeDownMeta_{event.camera}": {
            position: {
                x: 903.16855,
                y: 207.73627,
            },
            during: {
                incident: "/^BridgeDown_.*/",
                interval: 60.0,
            },
        },
        "BridgeNotUp_{event.camera}": {
            position: {
                x: 1044.48496,
                y: 349.71145,
            },
            start: {
                incident: "!/^BridgeDownMeta_.*/",
            },
            end: {
                timeout: 60,
                event: "nevet_condition",
            },
        },
        "BridgeUp_{event.camera}": {
            position: {
                x: 1689.8476,
                y: -57.15632,
            },
            during: {
                delay: 60.0,
                event: "bridge_up_case",
                interval: 15.0,
            },
        },
    },
}
