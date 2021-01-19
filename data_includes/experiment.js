var shuffleSequence = seq("intro",
    "intro_sep",
    sepWith("within_intro_sep", "practice"),
    "practice_sep",
    sepWith("sep",
        rshuffle(startsWith("condition"),
            startsWith("filler"),
        )), //
    "send_results",
    "debrief");
var practiceItemTypes = ["practice"];

// default settings
var manualSendResults = true;

var centerItems = true;
var showProgressBar = false;

var defaults = [

    "Separatortx", {
        showProgressBar: false,
        transfer: 1000,
        normalMessage: "Correct! Wonderful!",
        errorMessage: "Opps! Incorrect, please try again.",
        slowMessage: "Too Slow!"
    },

    "Separator", {
        showProgressBar: false,
        transfer: 1000,
        normalMessage: "Correct! Wonderful!",
        errorMessage: "Opps! Incorrect, please try again."
    },

    "DashedSentence", {
        mode: "self-paced reading"
    },
    "myquestiontx", {
        hideProgressBar: true,
        randomOrder: false,
        presentHorizontally: true,
        hasCorrect: false,
        timeout: 2500
    },
    "myquestion", {
        hideProgressBar: true,
        randomOrder: false,
        presentHorizontally: true,
        hasCorrect: false,
        timeout: 2500
    },
    "Question", {
        hideProgressBar: true,
        randomOrder: false,
        presentHorizontally: true,
        hasCorrect: false,
        timeout: 2500
    },
    "Message", {
        hideProgressBar: true,
        centerItems: true
    },
    "mymessage", {
        hideProgressBar: true,
        centerItems: true,
        transfer: 300
    },
    "mycross", {
        hideProgressBar: true,
        centerItems: true,
        transfer: 200
    },
    "myblank", {
        hideProgressBar: true,
        centerItems: true,
        transfer: 150
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Devam etmek için buraya tıklayınız.",
        obligatoryCheckboxErrorGenerator: function (field) {
            return "Bu alanı doldurmanız gerekmektedir."
        },
        obligatoryErrorGenerator: function (field) {
            return "Bu alanı doldurmanız gerekmektedir.";
        },
        obligatoryRadioErrorGenerator: function (field) {
            return "Seçeneklerden birini seçiniz.";
        }

    }
];

function modifyRunningOrder(ro) {
    for (var i = 0; i < ro.length; ++i) {
        if ((i != 0) && (i % 40 == 0)) {
            // Passing 'true' as the third argument casues the results from this controller to be omitted from the results file. 
            // (Though in fact, the Message controller does not add any results in any case.)
            ro[i].push(new DynamicElement(
                "Message", {
                    html: "<p>Kısa bir ara. Bir sonraki cümleye geçmek için boşluk tuşuna basınız.</p>",
                    transfer: "keypress"
                }, //, transfer: 1000 
                true
            ));
        }
    }
    return ro;
}


var items = [
        ["send_results", "__SendResults__", {}],

        ["sep", "Separatortx", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            slowMessage: "Çok yavaşsın! Biraz daha hızlı cevaplar ver!"
        }],

        ["intro_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir.",
            errorMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir."
        }],

        ["within_intro_sep", "Separatortx", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Lütfen cevap verirken biraz daha dikkatli olalım.",
            slowMessage: "Çok yavaşsın! Biraz daha hızlı cevaplar ver!"
        }],

        ["practice_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Deneye başlamak için boşluk tuşuna basınız.",
            errorMessage: "Lütfen cevap verirken biraz daha dikkatli olalım."
        }],

        ["intro", "Form", {
            html: {
                include: "introduction.html"
            },
            obligatoryCheckboxErrorGenerator: function (field) {
                return "Devam etmeden önce çalışmaya katılmayı kabul etmelisiniz.";
            }
        }],

        ["intro", "Form", {
            html: {
                include: "consent.html"
            },
            obligatoryCheckboxErrorGenerator: function (field) {
                return "Devam etmeden önce çalışmaya katılmayı kabul etmelisiniz.";
            }
        }],

        ["intro", "Form", {
            html: {
                include: "procedure.html"
            }
        }],

        ["intro", "Form", {
            html: {
                include: "final_instructions.html"
            }
        }],

        ["debrief", "mymessage", {
            html: ["div",
                "Deney sona erdi. Yanıtlarınız otomatik olarak kaydedildi. Katılımınız için çok teşekkür ederiz!"],
            transfer: 3000
        }],

        ["practice","mycross", {html: "+"}, "mymessage", {html: "monitör"}, "myblank", {html: ""}, "myquestiontx", {q: "bilgisayar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
        ["practice","mycross", {html: "+"}, "mymessage", {html: "monitör"}, "myblank", {html: ""}, "myquestiontx", {q: "bilgisayar" ,as: [["f","HAYIR"], ["j","EVET"]] }],

        ["practice", Message, {
            consentRequired: false,
            transfer: "keypress",
            html: ["div",
                ["p", "Deney esnasında vereceğiniz cevapları olabildiğince hızlı ve doğru vermeye çalışın. Deney boyunca deneye odaklanmanız gerekmektedir. Alıştırmaların aksine, deneyin kendisinde size geridönüt verilmeyecektir."],
                ["p", "Katılımınız için şimdiden çok teşekkürler!"],
            ]
        }],
        
        
        [["condition_related", 1], "mycross", {html: "+"}, "mymessage", {html: "monitör"}, "myblank", {html: ""}, "myquestiontx", {q: "bilgisayar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 1], "mycross", {html: "+"}, "mymessage", {html: "fındık"}, "myblank", {html: ""}, "myquestiontx", {q: "bilgisayar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 2], "mycross", {html: "+"}, "mymessage", {html: "ahize"}, "myblank", {html: ""}, "myquestiontx", {q: "telefon" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 2], "mycross", {html: "+"}, "mymessage", {html: "kapı"}, "myblank", {html: ""}, "myquestiontx", {q: "telefon" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 3], "mycross", {html: "+"}, "mymessage", {html: "kitap"}, "myblank", {html: ""}, "myquestiontx", {q: "defter" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 3], "mycross", {html: "+"}, "mymessage", {html: "köy"}, "myblank", {html: ""}, "myquestiontx", {q: "defter" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 4], "mycross", {html: "+"}, "mymessage", {html: "kök"}, "myblank", {html: ""}, "myquestiontx", {q: "ağaç" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 4], "mycross", {html: "+"}, "mymessage", {html: "sınıf"}, "myblank", {html: ""}, "myquestiontx", {q: "ağaç" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 5], "mycross", {html: "+"}, "mymessage", {html: "pena"}, "myblank", {html: ""}, "myquestiontx", {q: "gitar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 5], "mycross", {html: "+"}, "mymessage", {html: "silgi"}, "myblank", {html: ""}, "myquestiontx", {q: "gitar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 6], "mycross", {html: "+"}, "mymessage", {html: "dem"}, "myblank", {html: ""}, "myquestiontx", {q: "çaydanlık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 6], "mycross", {html: "+"}, "mymessage", {html: "hulahop"}, "myblank", {html: ""}, "myquestiontx", {q: "çaydanlık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 7], "mycross", {html: "+"}, "mymessage", {html: "köpek"}, "myblank", {html: ""}, "myquestiontx", {q: "kedi" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 7], "mycross", {html: "+"}, "mymessage", {html: "salata"}, "myblank", {html: ""}, "myquestiontx", {q: "kedi" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 8], "mycross", {html: "+"}, "mymessage", {html: "film"}, "myblank", {html: ""}, "myquestiontx", {q: "sinema" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 8], "mycross", {html: "+"}, "mymessage", {html: "toka"}, "myblank", {html: ""}, "myquestiontx", {q: "sinema" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 9], "mycross", {html: "+"}, "mymessage", {html: "banka"}, "myblank", {html: ""}, "myquestiontx", {q: "para" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 9], "mycross", {html: "+"}, "mymessage", {html: "küllük"}, "myblank", {html: ""}, "myquestiontx", {q: "para" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 10], "mycross", {html: "+"}, "mymessage", {html: "fincan"}, "myblank", {html: ""}, "myquestiontx", {q: "kahve" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 10], "mycross", {html: "+"}, "mymessage", {html: "tablo"}, "myblank", {html: ""}, "myquestiontx", {q: "kahve" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 11], "mycross", {html: "+"}, "mymessage", {html: "dehşet"}, "myblank", {html: ""}, "myquestiontx", {q: "korku" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 11], "mycross", {html: "+"}, "mymessage", {html: "bağırsak"}, "myblank", {html: ""}, "myquestiontx", {q: "korku" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 12], "mycross", {html: "+"}, "mymessage", {html: "yangın"}, "myblank", {html: ""}, "myquestiontx", {q: "ateş" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 12], "mycross", {html: "+"}, "mymessage", {html: "gül"}, "myblank", {html: ""}, "myquestiontx", {q: "ateş" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 13], "mycross", {html: "+"}, "mymessage", {html: "sınav"}, "myblank", {html: ""}, "myquestiontx", {q: "ders" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 13], "mycross", {html: "+"}, "mymessage", {html: "güneş"}, "myblank", {html: ""}, "myquestiontx", {q: "ders" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 14], "mycross", {html: "+"}, "mymessage", {html: "yazar"}, "myblank", {html: ""}, "myquestiontx", {q: "roman" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 14], "mycross", {html: "+"}, "mymessage", {html: "hıyar"}, "myblank", {html: ""}, "myquestiontx", {q: "roman" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 15], "mycross", {html: "+"}, "mymessage", {html: "gemi"}, "myblank", {html: ""}, "myquestiontx", {q: "deniz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 15], "mycross", {html: "+"}, "mymessage", {html: "okul"}, "myblank", {html: ""}, "myquestiontx", {q: "deniz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 16], "mycross", {html: "+"}, "mymessage", {html: "şarap"}, "myblank", {html: ""}, "myquestiontx", {q: "bira" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 16], "mycross", {html: "+"}, "mymessage", {html: "bayrak"}, "myblank", {html: ""}, "myquestiontx", {q: "bira" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 17], "mycross", {html: "+"}, "mymessage", {html: "sandalye"}, "myblank", {html: ""}, "myquestiontx", {q: "masa" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 17], "mycross", {html: "+"}, "mymessage", {html: "terlik"}, "myblank", {html: ""}, "myquestiontx", {q: "masa" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 18], "mycross", {html: "+"}, "mymessage", {html: "tezgah"}, "myblank", {html: ""}, "myquestiontx", {q: "pazar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 18], "mycross", {html: "+"}, "mymessage", {html: "ayna"}, "myblank", {html: ""}, "myquestiontx", {q: "pazar" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 19], "mycross", {html: "+"}, "mymessage", {html: "yorgan"}, "myblank", {html: ""}, "myquestiontx", {q: "yastık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 19], "mycross", {html: "+"}, "mymessage", {html: "televizyon"}, "myblank", {html: ""}, "myquestiontx", {q: "yastık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 20], "mycross", {html: "+"}, "mymessage", {html: "kaşık"}, "myblank", {html: ""}, "myquestiontx", {q: "çatal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 20], "mycross", {html: "+"}, "mymessage", {html: "mikrop"}, "myblank", {html: ""}, "myquestiontx", {q: "çatal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 21], "mycross", {html: "+"}, "mymessage", {html: "araba"}, "myblank", {html: ""}, "myquestiontx", {q: "otopark" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 21], "mycross", {html: "+"}, "mymessage", {html: "tarak"}, "myblank", {html: ""}, "myquestiontx", {q: "otopark" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 22], "mycross", {html: "+"}, "mymessage", {html: "düğme"}, "myblank", {html: ""}, "myquestiontx", {q: "gömlek" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 22], "mycross", {html: "+"}, "mymessage", {html: "orman"}, "myblank", {html: ""}, "myquestiontx", {q: "gömlek" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 23], "mycross", {html: "+"}, "mymessage", {html: "sürücü"}, "myblank", {html: ""}, "myquestiontx", {q: "ehliyet" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 23], "mycross", {html: "+"}, "mymessage", {html: "limon"}, "myblank", {html: ""}, "myquestiontx", {q: "ehliyet" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 24], "mycross", {html: "+"}, "mymessage", {html: "arı"}, "myblank", {html: ""}, "myquestiontx", {q: "bal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 24], "mycross", {html: "+"}, "mymessage", {html: "çamur"}, "myblank", {html: ""}, "myquestiontx", {q: "bal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 25], "mycross", {html: "+"}, "mymessage", {html: "bardak"}, "myblank", {html: ""}, "myquestiontx", {q: "sürahi" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 25], "mycross", {html: "+"}, "mymessage", {html: "dergi"}, "myblank", {html: ""}, "myquestiontx", {q: "sürahi" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 26], "mycross", {html: "+"}, "mymessage", {html: "çilek"}, "myblank", {html: ""}, "myquestiontx", {q: "reçel" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 26], "mycross", {html: "+"}, "mymessage", {html: "kağıt"}, "myblank", {html: ""}, "myquestiontx", {q: "reçel" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 27], "mycross", {html: "+"}, "mymessage", {html: "çakmak"}, "myblank", {html: ""}, "myquestiontx", {q: "sigara" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 27], "mycross", {html: "+"}, "mymessage", {html: "kitaplık"}, "myblank", {html: ""}, "myquestiontx", {q: "sigara" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 28], "mycross", {html: "+"}, "mymessage", {html: "komisyon"}, "myblank", {html: ""}, "myquestiontx", {q: "emlakçı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 28], "mycross", {html: "+"}, "mymessage", {html: "aspirin"}, "myblank", {html: ""}, "myquestiontx", {q: "emlakçı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 29], "mycross", {html: "+"}, "mymessage", {html: "ahır"}, "myblank", {html: ""}, "myquestiontx", {q: "at" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 29], "mycross", {html: "+"}, "mymessage", {html: "klavye"}, "myblank", {html: ""}, "myquestiontx", {q: "at" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 30], "mycross", {html: "+"}, "mymessage", {html: "tablet"}, "myblank", {html: ""}, "myquestiontx", {q: "ekran" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 30], "mycross", {html: "+"}, "mymessage", {html: "çamaşır"}, "myblank", {html: ""}, "myquestiontx", {q: "ekran" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 31], "mycross", {html: "+"}, "mymessage", {html: "kabuk"}, "myblank", {html: ""}, "myquestiontx", {q: "ceviz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 31], "mycross", {html: "+"}, "mymessage", {html: "yargı"}, "myblank", {html: ""}, "myquestiontx", {q: "ceviz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 32], "mycross", {html: "+"}, "mymessage", {html: "kilim"}, "myblank", {html: ""}, "myquestiontx", {q: "halı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 32], "mycross", {html: "+"}, "mymessage", {html: "yoğurt"}, "myblank", {html: ""}, "myquestiontx", {q: "halı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 33], "mycross", {html: "+"}, "mymessage", {html: "havuz"}, "myblank", {html: ""}, "myquestiontx", {q: "klor" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 33], "mycross", {html: "+"}, "mymessage", {html: "ton"}, "myblank", {html: ""}, "myquestiontx", {q: "klor" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 34], "mycross", {html: "+"}, "mymessage", {html: "internet"}, "myblank", {html: ""}, "myquestiontx", {q: "modem" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 34], "mycross", {html: "+"}, "mymessage", {html: "çorap"}, "myblank", {html: ""}, "myquestiontx", {q: "modem" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 35], "mycross", {html: "+"}, "mymessage", {html: "kase"}, "myblank", {html: ""}, "myquestiontx", {q: "çorba" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 35], "mycross", {html: "+"}, "mymessage", {html: "boru"}, "myblank", {html: ""}, "myquestiontx", {q: "çorba" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 36], "mycross", {html: "+"}, "mymessage", {html: "atkı"}, "myblank", {html: ""}, "myquestiontx", {q: "eldiven" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 36], "mycross", {html: "+"}, "mymessage", {html: "kare"}, "myblank", {html: ""}, "myquestiontx", {q: "eldiven" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 37], "mycross", {html: "+"}, "mymessage", {html: "çiçek"}, "myblank", {html: ""}, "myquestiontx", {q: "bitki" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 37], "mycross", {html: "+"}, "mymessage", {html: "yapıt"}, "myblank", {html: ""}, "myquestiontx", {q: "bitki" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 38], "mycross", {html: "+"}, "mymessage", {html: "hasta"}, "myblank", {html: ""}, "myquestiontx", {q: "doktor" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 38], "mycross", {html: "+"}, "mymessage", {html: "dolap"}, "myblank", {html: ""}, "myquestiontx", {q: "doktor" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 39], "mycross", {html: "+"}, "mymessage", {html: "portakal"}, "myblank", {html: ""}, "myquestiontx", {q: "mandalina" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 39], "mycross", {html: "+"}, "mymessage", {html: "kulaklık"}, "myblank", {html: ""}, "myquestiontx", {q: "mandalina" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 40], "mycross", {html: "+"}, "mymessage", {html: "odun"}, "myblank", {html: ""}, "myquestiontx", {q: "ahşap" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 40], "mycross", {html: "+"}, "mymessage", {html: "diş"}, "myblank", {html: ""}, "myquestiontx", {q: "ahşap" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 41], "mycross", {html: "+"}, "mymessage", {html: "tatlı"}, "myblank", {html: ""}, "myquestiontx", {q: "şeker" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 41], "mycross", {html: "+"}, "mymessage", {html: "yüzük"}, "myblank", {html: ""}, "myquestiontx", {q: "şeker" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 42], "mycross", {html: "+"}, "mymessage", {html: "kanat"}, "myblank", {html: ""}, "myquestiontx", {q: "kuş" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 42], "mycross", {html: "+"}, "mymessage", {html: "havlu"}, "myblank", {html: ""}, "myquestiontx", {q: "kuş" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 43], "mycross", {html: "+"}, "mymessage", {html: "balık"}, "myblank", {html: ""}, "myquestiontx", {q: "rakı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 43], "mycross", {html: "+"}, "mymessage", {html: "mücevher"}, "myblank", {html: ""}, "myquestiontx", {q: "rakı" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 44], "mycross", {html: "+"}, "mymessage", {html: "cevap"}, "myblank", {html: ""}, "myquestiontx", {q: "soru" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 44], "mycross", {html: "+"}, "mymessage", {html: "yarasa"}, "myblank", {html: ""}, "myquestiontx", {q: "soru" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 45], "mycross", {html: "+"}, "mymessage", {html: "yeşil"}, "myblank", {html: ""}, "myquestiontx", {q: "çimen" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 45], "mycross", {html: "+"}, "mymessage", {html: "hoparlör"}, "myblank", {html: ""}, "myquestiontx", {q: "çimen" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 46], "mycross", {html: "+"}, "mymessage", {html: "şempanze"}, "myblank", {html: ""}, "myquestiontx", {q: "maymun" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 46], "mycross", {html: "+"}, "mymessage", {html: "göl"}, "myblank", {html: ""}, "myquestiontx", {q: "maymun" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 47], "mycross", {html: "+"}, "mymessage", {html: "rektör"}, "myblank", {html: ""}, "myquestiontx", {q: "üniversite" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 47], "mycross", {html: "+"}, "mymessage", {html: "bıyık"}, "myblank", {html: ""}, "myquestiontx", {q: "üniversite" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 48], "mycross", {html: "+"}, "mymessage", {html: "direniş"}, "myblank", {html: ""}, "myquestiontx", {q: "eylem" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 48], "mycross", {html: "+"}, "mymessage", {html: "saç"}, "myblank", {html: ""}, "myquestiontx", {q: "eylem" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 49], "mycross", {html: "+"}, "mymessage", {html: "pencere"}, "myblank", {html: ""}, "myquestiontx", {q: "cam" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 49], "mycross", {html: "+"}, "mymessage", {html: "senfoni"}, "myblank", {html: ""}, "myquestiontx", {q: "cam" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 50], "mycross", {html: "+"}, "mymessage", {html: "kürek"}, "myblank", {html: ""}, "myquestiontx", {q: "kazma" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 50], "mycross", {html: "+"}, "mymessage", {html: "diploma"}, "myblank", {html: ""}, "myquestiontx", {q: "kazma" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 51], "mycross", {html: "+"}, "mymessage", {html: "tepsi"}, "myblank", {html: ""}, "myquestiontx", {q: "çay" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 51], "mycross", {html: "+"}, "mymessage", {html: "anahtar"}, "myblank", {html: ""}, "myquestiontx", {q: "çay" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 52], "mycross", {html: "+"}, "mymessage", {html: "top"}, "myblank", {html: ""}, "myquestiontx", {q: "tenis" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 52], "mycross", {html: "+"}, "mymessage", {html: "boşluk"}, "myblank", {html: ""}, "myquestiontx", {q: "tenis" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 53], "mycross", {html: "+"}, "mymessage", {html: "kimya"}, "myblank", {html: ""}, "myquestiontx", {q: "fizik" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 53], "mycross", {html: "+"}, "mymessage", {html: "makarna"}, "myblank", {html: ""}, "myquestiontx", {q: "fizik" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 54], "mycross", {html: "+"}, "mymessage", {html: "tuval"}, "myblank", {html: ""}, "myquestiontx", {q: "resim" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 54], "mycross", {html: "+"}, "mymessage", {html: "bulaşık"}, "myblank", {html: ""}, "myquestiontx", {q: "resim" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 55], "mycross", {html: "+"}, "mymessage", {html: "ilaç"}, "myblank", {html: ""}, "myquestiontx", {q: "sağlık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 55], "mycross", {html: "+"}, "mymessage", {html: "çerçeve"}, "myblank", {html: ""}, "myquestiontx", {q: "sağlık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 56], "mycross", {html: "+"}, "mymessage", {html: "çikolata"}, "myblank", {html: ""}, "myquestiontx", {q: "kakao" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 56], "mycross", {html: "+"}, "mymessage", {html: "turnike"}, "myblank", {html: ""}, "myquestiontx", {q: "kakao" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 57], "mycross", {html: "+"}, "mymessage", {html: "saksı"}, "myblank", {html: ""}, "myquestiontx", {q: "kaktüs" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 57], "mycross", {html: "+"}, "mymessage", {html: "bilye"}, "myblank", {html: ""}, "myquestiontx", {q: "kaktüs" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 58], "mycross", {html: "+"}, "mymessage", {html: "banyo"}, "myblank", {html: ""}, "myquestiontx", {q: "mutfak" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 58], "mycross", {html: "+"}, "mymessage", {html: "ödev"}, "myblank", {html: ""}, "myquestiontx", {q: "mutfak" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 59], "mycross", {html: "+"}, "mymessage", {html: "bambu"}, "myblank", {html: ""}, "myquestiontx", {q: "panda" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 59], "mycross", {html: "+"}, "mymessage", {html: "komodin"}, "myblank", {html: ""}, "myquestiontx", {q: "panda" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 60], "mycross", {html: "+"}, "mymessage", {html: "uzay"}, "myblank", {html: ""}, "myquestiontx", {q: "yıldız" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 60], "mycross", {html: "+"}, "mymessage", {html: "tel"}, "myblank", {html: ""}, "myquestiontx", {q: "yıldız" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 61], "mycross", {html: "+"}, "mymessage", {html: "atari"}, "myblank", {html: ""}, "myquestiontx", {q: "oyun" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 61], "mycross", {html: "+"}, "mymessage", {html: "koku"}, "myblank", {html: ""}, "myquestiontx", {q: "oyun" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 62], "mycross", {html: "+"}, "mymessage", {html: "kapak"}, "myblank", {html: ""}, "myquestiontx", {q: "şişe" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 62], "mycross", {html: "+"}, "mymessage", {html: "duvar"}, "myblank", {html: ""}, "myquestiontx", {q: "şişe" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 63], "mycross", {html: "+"}, "mymessage", {html: "pergel"}, "myblank", {html: ""}, "myquestiontx", {q: "cetvel" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 63], "mycross", {html: "+"}, "mymessage", {html: "üzüm"}, "myblank", {html: ""}, "myquestiontx", {q: "cetvel" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 64], "mycross", {html: "+"}, "mymessage", {html: "ray"}, "myblank", {html: ""}, "myquestiontx", {q: "tren" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 64], "mycross", {html: "+"}, "mymessage", {html: "allık"}, "myblank", {html: ""}, "myquestiontx", {q: "tren" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 65], "mycross", {html: "+"}, "mymessage", {html: "hamur"}, "myblank", {html: ""}, "myquestiontx", {q: "ekmek" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 65], "mycross", {html: "+"}, "mymessage", {html: "zımba"}, "myblank", {html: ""}, "myquestiontx", {q: "ekmek" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 66], "mycross", {html: "+"}, "mymessage", {html: "tiraj"}, "myblank", {html: ""}, "myquestiontx", {q: "gazete" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 66], "mycross", {html: "+"}, "mymessage", {html: "akü"}, "myblank", {html: ""}, "myquestiontx", {q: "gazete" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 67], "mycross", {html: "+"}, "mymessage", {html: "fatura"}, "myblank", {html: ""}, "myquestiontx", {q: "vezne" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 67], "mycross", {html: "+"}, "mymessage", {html: "klarnet"}, "myblank", {html: ""}, "myquestiontx", {q: "vezne" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 68], "mycross", {html: "+"}, "mymessage", {html: "uydu"}, "myblank", {html: ""}, "myquestiontx", {q: "ay" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 68], "mycross", {html: "+"}, "mymessage", {html: "uygun"}, "myblank", {html: ""}, "myquestiontx", {q: "ay" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 69], "mycross", {html: "+"}, "mymessage", {html: "zeka"}, "myblank", {html: ""}, "myquestiontx", {q: "akıl" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 69], "mycross", {html: "+"}, "mymessage", {html: "kardeş"}, "myblank", {html: ""}, "myquestiontx", {q: "akıl" ,as: [["f","HAYIR"], ["j","EVET"]] }], 
[["filler", 201], "mycross", {html: "+"}, "mymessage", {html: "hücre"}, "myblank", {html: ""}, "myquestiontx", {q: "turus" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 202], "mycross", {html: "+"}, "mymessage", {html: "dosya"}, "myblank", {html: ""}, "myquestiontx", {q: "falpa" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 203], "mycross", {html: "+"}, "mymessage", {html: "kolonya"}, "myblank", {html: ""}, "myquestiontx", {q: "hales" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 204], "mycross", {html: "+"}, "mymessage", {html: "sütlaç"}, "myblank", {html: ""}, "myquestiontx", {q: "çoran" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 205], "mycross", {html: "+"}, "mymessage", {html: "nane"}, "myblank", {html: ""}, "myquestiontx", {q: "tasuna" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 206], "mycross", {html: "+"}, "mymessage", {html: "karpuz"}, "myblank", {html: ""}, "myquestiontx", {q: "taparu" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 207], "mycross", {html: "+"}, "mymessage", {html: "yürek"}, "myblank", {html: ""}, "myquestiontx", {q: "karna" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 208], "mycross", {html: "+"}, "mymessage", {html: "lale"}, "myblank", {html: ""}, "myquestiontx", {q: "surun" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 209], "mycross", {html: "+"}, "mymessage", {html: "çarşaf"}, "myblank", {html: ""}, "myquestiontx", {q: "palit" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 210], "mycross", {html: "+"}, "mymessage", {html: "ak"}, "myblank", {html: ""}, "myquestiontx", {q: "çarul" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 211], "mycross", {html: "+"}, "mymessage", {html: "traş"}, "myblank", {html: ""}, "myquestiontx", {q: "perlan" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 212], "mycross", {html: "+"}, "mymessage", {html: "bilardo"}, "myblank", {html: ""}, "myquestiontx", {q: "rastak" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 213], "mycross", {html: "+"}, "mymessage", {html: "sucuk"}, "myblank", {html: ""}, "myquestiontx", {q: "lemün" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 214], "mycross", {html: "+"}, "mymessage", {html: "tencere"}, "myblank", {html: ""}, "myquestiontx", {q: "tarpa" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 215], "mycross", {html: "+"}, "mymessage", {html: "heykel"}, "myblank", {html: ""}, "myquestiontx", {q: "meşgür" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 216], "mycross", {html: "+"}, "mymessage", {html: "ayva"}, "myblank", {html: ""}, "myquestiontx", {q: "püşür" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 217], "mycross", {html: "+"}, "mymessage", {html: "dana"}, "myblank", {html: ""}, "myquestiontx", {q: "temer" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 218], "mycross", {html: "+"}, "mymessage", {html: "salıncak"}, "myblank", {html: ""}, "myquestiontx", {q: "petil" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 219], "mycross", {html: "+"}, "mymessage", {html: "traktör"}, "myblank", {html: ""}, "myquestiontx", {q: "deref" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 220], "mycross", {html: "+"}, "mymessage", {html: "koşu"}, "myblank", {html: ""}, "myquestiontx", {q: "telke" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 221], "mycross", {html: "+"}, "mymessage", {html: "halka"}, "myblank", {html: ""}, "myquestiontx", {q: "lişmik" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 222], "mycross", {html: "+"}, "mymessage", {html: "koyun"}, "myblank", {html: ""}, "myquestiontx", {q: "hattas" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 223], "mycross", {html: "+"}, "mymessage", {html: "bilim"}, "myblank", {html: ""}, "myquestiontx", {q: "fırtıs" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 224], "mycross", {html: "+"}, "mymessage", {html: "deney"}, "myblank", {html: ""}, "myquestiontx", {q: "fetes" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 225], "mycross", {html: "+"}, "mymessage", {html: "katarsis"}, "myblank", {html: ""}, "myquestiontx", {q: "kıptıp" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 226], "mycross", {html: "+"}, "mymessage", {html: "çehre"}, "myblank", {html: ""}, "myquestiontx", {q: "tincaz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 228], "mycross", {html: "+"}, "mymessage", {html: "saygı"}, "myblank", {html: ""}, "myquestiontx", {q: "yolgat" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 229], "mycross", {html: "+"}, "mymessage", {html: "çarşı"}, "myblank", {html: ""}, "myquestiontx", {q: "ipket" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 230], "mycross", {html: "+"}, "mymessage", {html: "arşiv"}, "myblank", {html: ""}, "myquestiontx", {q: "balemut" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 231], "mycross", {html: "+"}, "mymessage", {html: "tabak"}, "myblank", {html: ""}, "myquestiontx", {q: "kuçal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 232], "mycross", {html: "+"}, "mymessage", {html: "sarkıt"}, "myblank", {html: ""}, "myquestiontx", {q: "olmut" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 233], "mycross", {html: "+"}, "mymessage", {html: "avukat"}, "myblank", {html: ""}, "myquestiontx", {q: "bekvir" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 234], "mycross", {html: "+"}, "mymessage", {html: "tahta"}, "myblank", {html: ""}, "myquestiontx", {q: "zamal" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 235], "mycross", {html: "+"}, "mymessage", {html: "ayrı"}, "myblank", {html: ""}, "myquestiontx", {q: "fertik" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 236], "mycross", {html: "+"}, "mymessage", {html: "avize"}, "myblank", {html: ""}, "myquestiontx", {q: "bazık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 237], "mycross", {html: "+"}, "mymessage", {html: "tartı"}, "myblank", {html: ""}, "myquestiontx", {q: "urkut" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 238], "mycross", {html: "+"}, "mymessage", {html: "amaç"}, "myblank", {html: ""}, "myquestiontx", {q: "busgu" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 239], "mycross", {html: "+"}, "mymessage", {html: "yanıt"}, "myblank", {html: ""}, "myquestiontx", {q: "tolsu" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 240], "mycross", {html: "+"}, "mymessage", {html: "mısır"}, "myblank", {html: ""}, "myquestiontx", {q: "barıca" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 241], "mycross", {html: "+"}, "mymessage", {html: "muz"}, "myblank", {html: ""}, "myquestiontx", {q: "merik" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 242], "mycross", {html: "+"}, "mymessage", {html: "paket"}, "myblank", {html: ""}, "myquestiontx", {q: "hukur" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 243], "mycross", {html: "+"}, "mymessage", {html: "matara"}, "myblank", {html: ""}, "myquestiontx", {q: "gehveç" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 244], "mycross", {html: "+"}, "mymessage", {html: "çeşme"}, "myblank", {html: ""}, "myquestiontx", {q: "sumluk" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 245], "mycross", {html: "+"}, "mymessage", {html: "sipsi"}, "myblank", {html: ""}, "myquestiontx", {q: "gumdan" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 246], "mycross", {html: "+"}, "mymessage", {html: "manav"}, "myblank", {html: ""}, "myquestiontx", {q: "darlam" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 247], "mycross", {html: "+"}, "mymessage", {html: "kasap"}, "myblank", {html: ""}, "myquestiontx", {q: "pendir" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 248], "mycross", {html: "+"}, "mymessage", {html: "bıçak"}, "myblank", {html: ""}, "myquestiontx", {q: "terset" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 249], "mycross", {html: "+"}, "mymessage", {html: "köşe"}, "myblank", {html: ""}, "myquestiontx", {q: "künfer" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 250], "mycross", {html: "+"}, "mymessage", {html: "kuruntu"}, "myblank", {html: ""}, "myquestiontx", {q: "gacık" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 251], "mycross", {html: "+"}, "mymessage", {html: "çakışma"}, "myblank", {html: ""}, "myquestiontx", {q: "sahir" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 252], "mycross", {html: "+"}, "mymessage", {html: "kumpas"}, "myblank", {html: ""}, "myquestiontx", {q: "tarkuz" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 253], "mycross", {html: "+"}, "mymessage", {html: "saman"}, "myblank", {html: ""}, "myquestiontx", {q: "şırpan" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 254], "mycross", {html: "+"}, "mymessage", {html: "öküz"}, "myblank", {html: ""}, "myquestiontx", {q: "sün" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 255], "mycross", {html: "+"}, "mymessage", {html: "şarapnel"}, "myblank", {html: ""}, "myquestiontx", {q: "tarapil" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 256], "mycross", {html: "+"}, "mymessage", {html: "seçim"}, "myblank", {html: ""}, "myquestiontx", {q: "kalpuk" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 257], "mycross", {html: "+"}, "mymessage", {html: "meyve"}, "myblank", {html: ""}, "myquestiontx", {q: "çurtan" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 258], "mycross", {html: "+"}, "mymessage", {html: "bozgun"}, "myblank", {html: ""}, "myquestiontx", {q: "serşan" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 259], "mycross", {html: "+"}, "mymessage", {html: "perde"}, "myblank", {html: ""}, "myquestiontx", {q: "hecras" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 260], "mycross", {html: "+"}, "mymessage", {html: "kılavuz"}, "myblank", {html: ""}, "myquestiontx", {q: "çart" ,as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 261], "mycross", {html: "+"}, "mymessage", {html: "dünya"}, "myblank", {html: ""}, "myquestiontx", {q: "kirek" ,as: [["f","HAYIR"], ["j","EVET"]] }]   ];