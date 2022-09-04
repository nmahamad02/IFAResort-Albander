(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts/lib/echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts/lib/echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('admin-template', {
        "color": [
            "#1b3e76",
            "#2e69c9",
            "#3b86fe",
            "#bad4ff",
            "#86b4ff"
        ],
        "backgroundColor": "rgba(0,0,0,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#516b91",
                "fontFamily": "Nunito"
            },
            "subtextStyle": {
                "color": "#93b7e3",
                "fontFamily": "Nunito"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#B8C1D4"
                },
                "emphasis": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#B8C1D4"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#edafda",
                    "color0": "transparent",
                    "borderColor": "#d680bc",
                    "borderColor0": "#8fd3e8",
                    "borderWidth": "2"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#B8C1D4"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaa"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true,
            "color": [
                "#035388",
                "#40c3f7",
                "#b3ecff",
                "#52606d",
                "#127fbf",
                "#9aa5b1"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#B8C1D4",
                        "fontFamily": "Nunito"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000",
                        "fontFamily": "Nunito"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)",
                        "fontFamily": "Nunito"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000",
                        "fontFamily": "Nunito"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)",
                        "fontFamily": "Nunito"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#B8C1D4"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333",
                    "type": 'dashed'
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#B8C1D4",
                    "fontFamily": "Nunito"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                  "type": 'dashed',
                  "width": 0.5,
                    "color": [
                        "#B8C1D4"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#B8C1D4",
                    "fontFamily": "Nunito"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#B8C1D4",
                    "fontFamily": "Nunito"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                  "type": 'dashed',
                  "width": 0.5,
                    "color": [
                        "#B8C1D4"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#B8C1D4"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#B8C1D4",
                    "fontFamily": "Nunito"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                  "type": 'dashed',
                  "width": 0.5,
                    "color": [
                        "#B8C1D4"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#B8C1D4"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#B8C1D4",
                    "fontFamily": "Nunito"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                  "type": 'dashed',
                  "width": 0.5,
                    "color": [
                        "#B8C1D4"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#B8C1D4"
                },
                "emphasis": {
                    "borderColor": "#666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#B8C1D4",
                "fontFamily": "Nunito"
            }
        },
        "tooltip": {
          "textStyle": {
              "color": "#9AA5B1",
              "fontFamily": "Nunito"
            },
          "backgroundColor": "#FFF",
          "borderWidth": 1,
          "borderColor": "#B8C1D4",
          "padding": 10,
          "position": "top",
          "axisPointer": {
              "lineStyle": {
                  "color": "#B8C1D4",
                  "width": 1
              },
              "crossStyle": {
                  "color": "#B8C1D4",
                  "width": 1
              }
          }
        },
        "timeline": {
            "lineStyle": {
                "color": "#8fd3e8",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#8fd3e8"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#8fd3e8",
                "borderColor": "rgba(138,124,168,0.37)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8",
                        "fontFamily": "Nunito"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8",
                        "fontFamily": "Nunito"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#516b91",
                "#59c4e6",
                "#a5e7f0"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#B8C1D4",
                "fontFamily": "Nunito"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#B8C1D4",
                        "fontFamily": "Nunito"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#B8C1D4",
                        "fontFamily": "Nunito"
                    }
                }
            }
        }
    });
}));
