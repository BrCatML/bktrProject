export default {
    incidents: {
        "SKHP_Action_NTHK_{event.camera}": {
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
            during: {
                event: "person_action_sibur",
                interval: 10.0,
            },
        },
        SKHP_T0_NoAction: {
            during: {
                incident: "/SKHP_T0_NoAction_.*/",
                interval: 0.0,
            },
            end: {
                incident: "/SKHP_T1_TrainIn_.*/",
            },
        },
        "SKHP_T0_NoAction_{event.camera}": {
            during: {
                event: "no_action_case",
                interval: 60.0,
                delay: 60,
            },
        },
        SKHP_T1_TrainIn: {
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
            end: {
                incident: "/SKHP_T3_.*/",
                timeout: 36000.0,
            },
            start: {
                incident: "!SKHP_T1_TrainIn",
            },
        },
        "SKHP_T2_BridgeDown_{incident.first_event.camera}": {
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
            during: {
                incident: "/SKHP_T3_Liquid_.*/",
                interval: 0.0,
            },
        },
        "SKHP_T3_Liquid_{incident.value}": {
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
            start: {
                incident: "!SKHP_T3_Liquid",
            },
            end: {
                incident: "SKHP_T5_TrainOut",
                timeout: 36000,
            },
        },
        "SKHP_T4_BridgeUp_{incident.value}": {
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
            during: {
                incident: "/SKHP_T5_TrainOut_.*/",
                interval: 0.0,
            },
        },
        "SKHP_T5_TrainOut_{incident.value}": {
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
            during: {
                delay: 60.0,
                event: "bridge_down_case",
                interval: 30.0,
            },
        },
        "BridgeDownMeta_{event.camera}": {
            during: {
                incident: "/^BridgeDown_.*/",
                interval: 60.0,
            },
        },
        "BridgeNotUp_{event.camera}": {
            start: {
                incident: "!/^BridgeDownMeta_.*/",
            },
            end: {
                timeout: 60,
                event: "nevet_condition",
            },
        },
        "BridgeUp_{event.camera}": {
            during: {
                delay: 60.0,
                event: "bridge_up_case",
                interval: 15.0,
            },
        },
    },
}
