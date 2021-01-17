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

    "Separator", {
        showProgressBar: false,
        transfer: 1000,
        normalMessage: "Correct! Wonderful!",
        errorMessage: "Opps! Incorrect, please try again."
    },

    "DashedSentence", {
        mode: "self-paced reading"
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
        transfer: 1000
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

        ["sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız."
        }],

        ["intro_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir.",
            errorMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir."
        }],

        ["within_intro_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Lütfen cevap verirken biraz daha dikkatli olalım."
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

        ["practice","mymessage", {html: "+"},
        "mymessage", {html: "göz"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "bina"},
        "mymessage", {html: "+"}, 
        "myquestion", {hasCorrect:1, q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        ["practice","mymessage", {html: "+"},
        "mymessage", {html: "ağır"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "übtey"},
        "mymessage", {html: "+"}, 
        "myquestion", {hasCorrect: 0, q: "",as: [["f","HAYIR"], ["j","EVET"]] }],

        ["practice", Message, {
            consentRequired: false,
            transfer: "keypress",
            html: ["div",
                ["p", "Deney esnasında vereceğiniz cevapları olabildiğince hızlı ve doğru vermeye çalışın. Deney boyunca deneye odaklanmanız gerekmektedir. Alıştırmaların aksine, deneyin kendisinde size geridönüt verilmeyecektir."],
                ["p", "Katılımınız için şimdiden çok teşekkürler!"],
            ]
        }],
        
        
        [["condition_related", 1],"mymessage", {html: "+"}, "mymessage", {html: "monitör"}, "mymessage", {html: "+"}, "mymessage", {html: "bilgisayar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 1],"mymessage", {html: "+"}, "mymessage", {html: "fındık"}, "mymessage", {html: "+"}, "mymessage", {html: "bilgisayar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 2],"mymessage", {html: "+"}, "mymessage", {html: "ahize"}, "mymessage", {html: "+"}, "mymessage", {html: "telefon"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 2],"mymessage", {html: "+"}, "mymessage", {html: "kapı"}, "mymessage", {html: "+"}, "mymessage", {html: "telefon"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 3],"mymessage", {html: "+"}, "mymessage", {html: "kitap"}, "mymessage", {html: "+"}, "mymessage", {html: "defter"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 3],"mymessage", {html: "+"}, "mymessage", {html: "köy"}, "mymessage", {html: "+"}, "mymessage", {html: "defter"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 4],"mymessage", {html: "+"}, "mymessage", {html: "kök"}, "mymessage", {html: "+"}, "mymessage", {html: "ağaç"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 4],"mymessage", {html: "+"}, "mymessage", {html: "sınıf"}, "mymessage", {html: "+"}, "mymessage", {html: "ağaç"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 5],"mymessage", {html: "+"}, "mymessage", {html: "pena"}, "mymessage", {html: "+"}, "mymessage", {html: "gitar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 5],"mymessage", {html: "+"}, "mymessage", {html: "silgi"}, "mymessage", {html: "+"}, "mymessage", {html: "gitar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 6],"mymessage", {html: "+"}, "mymessage", {html: "dem"}, "mymessage", {html: "+"}, "mymessage", {html: "çaydanlık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 6],"mymessage", {html: "+"}, "mymessage", {html: "hulahop"}, "mymessage", {html: "+"}, "mymessage", {html: "çaydanlık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 7],"mymessage", {html: "+"}, "mymessage", {html: "köpek"}, "mymessage", {html: "+"}, "mymessage", {html: "kedi"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 7],"mymessage", {html: "+"}, "mymessage", {html: "salata"}, "mymessage", {html: "+"}, "mymessage", {html: "kedi"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 8],"mymessage", {html: "+"}, "mymessage", {html: "film"}, "mymessage", {html: "+"}, "mymessage", {html: "sinema"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 8],"mymessage", {html: "+"}, "mymessage", {html: "toka"}, "mymessage", {html: "+"}, "mymessage", {html: "sinema"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 9],"mymessage", {html: "+"}, "mymessage", {html: "banka"}, "mymessage", {html: "+"}, "mymessage", {html: "para"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 9],"mymessage", {html: "+"}, "mymessage", {html: "küllük"}, "mymessage", {html: "+"}, "mymessage", {html: "para"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 10],"mymessage", {html: "+"}, "mymessage", {html: "fincan"}, "mymessage", {html: "+"}, "mymessage", {html: "kahve"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 10],"mymessage", {html: "+"}, "mymessage", {html: "tablo"}, "mymessage", {html: "+"}, "mymessage", {html: "kahve"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 11],"mymessage", {html: "+"}, "mymessage", {html: "dehşet"}, "mymessage", {html: "+"}, "mymessage", {html: "korku"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 11],"mymessage", {html: "+"}, "mymessage", {html: "bağırsak"}, "mymessage", {html: "+"}, "mymessage", {html: "korku"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 12],"mymessage", {html: "+"}, "mymessage", {html: "yangın"}, "mymessage", {html: "+"}, "mymessage", {html: "ateş"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 12],"mymessage", {html: "+"}, "mymessage", {html: "gül"}, "mymessage", {html: "+"}, "mymessage", {html: "ateş"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 13],"mymessage", {html: "+"}, "mymessage", {html: "sınav"}, "mymessage", {html: "+"}, "mymessage", {html: "ders"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 13],"mymessage", {html: "+"}, "mymessage", {html: "güneş"}, "mymessage", {html: "+"}, "mymessage", {html: "ders"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 14],"mymessage", {html: "+"}, "mymessage", {html: "yazar"}, "mymessage", {html: "+"}, "mymessage", {html: "roman"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 14],"mymessage", {html: "+"}, "mymessage", {html: "hıyar"}, "mymessage", {html: "+"}, "mymessage", {html: "roman"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 15],"mymessage", {html: "+"}, "mymessage", {html: "gemi"}, "mymessage", {html: "+"}, "mymessage", {html: "deniz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 15],"mymessage", {html: "+"}, "mymessage", {html: "okul"}, "mymessage", {html: "+"}, "mymessage", {html: "deniz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 16],"mymessage", {html: "+"}, "mymessage", {html: "şarap"}, "mymessage", {html: "+"}, "mymessage", {html: "bira"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 16],"mymessage", {html: "+"}, "mymessage", {html: "kedi"}, "mymessage", {html: "+"}, "mymessage", {html: "bira"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 17],"mymessage", {html: "+"}, "mymessage", {html: "sandalye"}, "mymessage", {html: "+"}, "mymessage", {html: "masa"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 17],"mymessage", {html: "+"}, "mymessage", {html: "terlik"}, "mymessage", {html: "+"}, "mymessage", {html: "masa"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 18],"mymessage", {html: "+"}, "mymessage", {html: "tezgah"}, "mymessage", {html: "+"}, "mymessage", {html: "pazar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 18],"mymessage", {html: "+"}, "mymessage", {html: "ayna"}, "mymessage", {html: "+"}, "mymessage", {html: "pazar"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 19],"mymessage", {html: "+"}, "mymessage", {html: "yorgan"}, "mymessage", {html: "+"}, "mymessage", {html: "yastık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 19],"mymessage", {html: "+"}, "mymessage", {html: "televizyon"}, "mymessage", {html: "+"}, "mymessage", {html: "yastık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 20],"mymessage", {html: "+"}, "mymessage", {html: "kaşık"}, "mymessage", {html: "+"}, "mymessage", {html: "çatal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 20],"mymessage", {html: "+"}, "mymessage", {html: "defter"}, "mymessage", {html: "+"}, "mymessage", {html: "çatal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 21],"mymessage", {html: "+"}, "mymessage", {html: "araba"}, "mymessage", {html: "+"}, "mymessage", {html: "otopark"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 21],"mymessage", {html: "+"}, "mymessage", {html: "tarak"}, "mymessage", {html: "+"}, "mymessage", {html: "otopark"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 22],"mymessage", {html: "+"}, "mymessage", {html: "düğme"}, "mymessage", {html: "+"}, "mymessage", {html: "gömlek"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 22],"mymessage", {html: "+"}, "mymessage", {html: "orman"}, "mymessage", {html: "+"}, "mymessage", {html: "gömlek"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 23],"mymessage", {html: "+"}, "mymessage", {html: "sürücü"}, "mymessage", {html: "+"}, "mymessage", {html: "ehliyet"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 23],"mymessage", {html: "+"}, "mymessage", {html: "limon"}, "mymessage", {html: "+"}, "mymessage", {html: "ehliyet"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 24],"mymessage", {html: "+"}, "mymessage", {html: "arı"}, "mymessage", {html: "+"}, "mymessage", {html: "bal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 24],"mymessage", {html: "+"}, "mymessage", {html: "çamur"}, "mymessage", {html: "+"}, "mymessage", {html: "bal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 25],"mymessage", {html: "+"}, "mymessage", {html: "bardak"}, "mymessage", {html: "+"}, "mymessage", {html: "sürahi"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 25],"mymessage", {html: "+"}, "mymessage", {html: "kuş"}, "mymessage", {html: "+"}, "mymessage", {html: "sürahi"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 26],"mymessage", {html: "+"}, "mymessage", {html: "çilek"}, "mymessage", {html: "+"}, "mymessage", {html: "reçel"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 26],"mymessage", {html: "+"}, "mymessage", {html: "kağıt"}, "mymessage", {html: "+"}, "mymessage", {html: "reçel"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 27],"mymessage", {html: "+"}, "mymessage", {html: "çakmak"}, "mymessage", {html: "+"}, "mymessage", {html: "sigara"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 27],"mymessage", {html: "+"}, "mymessage", {html: "kitaplık"}, "mymessage", {html: "+"}, "mymessage", {html: "sigara"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 28],"mymessage", {html: "+"}, "mymessage", {html: "komisyon"}, "mymessage", {html: "+"}, "mymessage", {html: "emlakçı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 28],"mymessage", {html: "+"}, "mymessage", {html: "aspirin"}, "mymessage", {html: "+"}, "mymessage", {html: "emlakçı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 29],"mymessage", {html: "+"}, "mymessage", {html: "ahır"}, "mymessage", {html: "+"}, "mymessage", {html: "at"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 29],"mymessage", {html: "+"}, "mymessage", {html: "klavye"}, "mymessage", {html: "+"}, "mymessage", {html: "at"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 30],"mymessage", {html: "+"}, "mymessage", {html: "tablet"}, "mymessage", {html: "+"}, "mymessage", {html: "ekran"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 30],"mymessage", {html: "+"}, "mymessage", {html: "çamaşır"}, "mymessage", {html: "+"}, "mymessage", {html: "ekran"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 31],"mymessage", {html: "+"}, "mymessage", {html: "kabuk"}, "mymessage", {html: "+"}, "mymessage", {html: "ceviz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 31],"mymessage", {html: "+"}, "mymessage", {html: "atkı"}, "mymessage", {html: "+"}, "mymessage", {html: "ceviz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 32],"mymessage", {html: "+"}, "mymessage", {html: "kilim"}, "mymessage", {html: "+"}, "mymessage", {html: "halı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 32],"mymessage", {html: "+"}, "mymessage", {html: "yoğurt"}, "mymessage", {html: "+"}, "mymessage", {html: "halı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 33],"mymessage", {html: "+"}, "mymessage", {html: "havuz"}, "mymessage", {html: "+"}, "mymessage", {html: "klor"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 33],"mymessage", {html: "+"}, "mymessage", {html: "tablo"}, "mymessage", {html: "+"}, "mymessage", {html: "klor"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 34],"mymessage", {html: "+"}, "mymessage", {html: "internet"}, "mymessage", {html: "+"}, "mymessage", {html: "modem"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 34],"mymessage", {html: "+"}, "mymessage", {html: "çorap"}, "mymessage", {html: "+"}, "mymessage", {html: "modem"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 35],"mymessage", {html: "+"}, "mymessage", {html: "kase"}, "mymessage", {html: "+"}, "mymessage", {html: "çorba"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 35],"mymessage", {html: "+"}, "mymessage", {html: "boru"}, "mymessage", {html: "+"}, "mymessage", {html: "çorba"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 36],"mymessage", {html: "+"}, "mymessage", {html: "atkı"}, "mymessage", {html: "+"}, "mymessage", {html: "eldiven"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 36],"mymessage", {html: "+"}, "mymessage", {html: "kare"}, "mymessage", {html: "+"}, "mymessage", {html: "eldiven"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 37],"mymessage", {html: "+"}, "mymessage", {html: "çiçek"}, "mymessage", {html: "+"}, "mymessage", {html: "bitki"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 37],"mymessage", {html: "+"}, "mymessage", {html: "yapıt"}, "mymessage", {html: "+"}, "mymessage", {html: "bitki"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 38],"mymessage", {html: "+"}, "mymessage", {html: "hasta"}, "mymessage", {html: "+"}, "mymessage", {html: "doktor"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 38],"mymessage", {html: "+"}, "mymessage", {html: "dolap"}, "mymessage", {html: "+"}, "mymessage", {html: "doktor"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 39],"mymessage", {html: "+"}, "mymessage", {html: "portakal"}, "mymessage", {html: "+"}, "mymessage", {html: "mandalina"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 39],"mymessage", {html: "+"}, "mymessage", {html: "kulaklık"}, "mymessage", {html: "+"}, "mymessage", {html: "mandalina"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 40],"mymessage", {html: "+"}, "mymessage", {html: "odun"}, "mymessage", {html: "+"}, "mymessage", {html: "ahşap"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 40],"mymessage", {html: "+"}, "mymessage", {html: "diş"}, "mymessage", {html: "+"}, "mymessage", {html: "ahşap"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 41],"mymessage", {html: "+"}, "mymessage", {html: "tatlı"}, "mymessage", {html: "+"}, "mymessage", {html: "şeker"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 41],"mymessage", {html: "+"}, "mymessage", {html: "yüzük"}, "mymessage", {html: "+"}, "mymessage", {html: "şeker"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 42],"mymessage", {html: "+"}, "mymessage", {html: "kanat"}, "mymessage", {html: "+"}, "mymessage", {html: "kuş"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 42],"mymessage", {html: "+"}, "mymessage", {html: "havlu"}, "mymessage", {html: "+"}, "mymessage", {html: "kuş"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 43],"mymessage", {html: "+"}, "mymessage", {html: "balık"}, "mymessage", {html: "+"}, "mymessage", {html: "rakı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 43],"mymessage", {html: "+"}, "mymessage", {html: "mücevher"}, "mymessage", {html: "+"}, "mymessage", {html: "rakı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 44],"mymessage", {html: "+"}, "mymessage", {html: "cevap"}, "mymessage", {html: "+"}, "mymessage", {html: "soru"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 44],"mymessage", {html: "+"}, "mymessage", {html: "yarasa"}, "mymessage", {html: "+"}, "mymessage", {html: "soru"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 45],"mymessage", {html: "+"}, "mymessage", {html: "yeşil"}, "mymessage", {html: "+"}, "mymessage", {html: "çimen"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 45],"mymessage", {html: "+"}, "mymessage", {html: "kahve"}, "mymessage", {html: "+"}, "mymessage", {html: "çimen"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 46],"mymessage", {html: "+"}, "mymessage", {html: "şempanze"}, "mymessage", {html: "+"}, "mymessage", {html: "maymun"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 46],"mymessage", {html: "+"}, "mymessage", {html: "deniz"}, "mymessage", {html: "+"}, "mymessage", {html: "maymun"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 47],"mymessage", {html: "+"}, "mymessage", {html: "rektör"}, "mymessage", {html: "+"}, "mymessage", {html: "üniversite"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 47],"mymessage", {html: "+"}, "mymessage", {html: "bıyık"}, "mymessage", {html: "+"}, "mymessage", {html: "üniversite"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 48],"mymessage", {html: "+"}, "mymessage", {html: "direniş"}, "mymessage", {html: "+"}, "mymessage", {html: "eylem"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 48],"mymessage", {html: "+"}, "mymessage", {html: "saç"}, "mymessage", {html: "+"}, "mymessage", {html: "eylem"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 49],"mymessage", {html: "+"}, "mymessage", {html: "pencere"}, "mymessage", {html: "+"}, "mymessage", {html: "kapı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 49],"mymessage", {html: "+"}, "mymessage", {html: "senfoni"}, "mymessage", {html: "+"}, "mymessage", {html: "kapı"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 50],"mymessage", {html: "+"}, "mymessage", {html: "kürek"}, "mymessage", {html: "+"}, "mymessage", {html: "kazma"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 50],"mymessage", {html: "+"}, "mymessage", {html: "diploma"}, "mymessage", {html: "+"}, "mymessage", {html: "kazma"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 51],"mymessage", {html: "+"}, "mymessage", {html: "tepsi"}, "mymessage", {html: "+"}, "mymessage", {html: "çay"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 51],"mymessage", {html: "+"}, "mymessage", {html: "anahtar"}, "mymessage", {html: "+"}, "mymessage", {html: "çay"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 52],"mymessage", {html: "+"}, "mymessage", {html: "top"}, "mymessage", {html: "+"}, "mymessage", {html: "tenis"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 52],"mymessage", {html: "+"}, "mymessage", {html: "boşluk"}, "mymessage", {html: "+"}, "mymessage", {html: "tenis"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 53],"mymessage", {html: "+"}, "mymessage", {html: "kimya"}, "mymessage", {html: "+"}, "mymessage", {html: "fizik"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 53],"mymessage", {html: "+"}, "mymessage", {html: "atkı"}, "mymessage", {html: "+"}, "mymessage", {html: "fizik"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 54],"mymessage", {html: "+"}, "mymessage", {html: "tuval"}, "mymessage", {html: "+"}, "mymessage", {html: "resim"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 54],"mymessage", {html: "+"}, "mymessage", {html: "bulaşık"}, "mymessage", {html: "+"}, "mymessage", {html: "resim"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 55],"mymessage", {html: "+"}, "mymessage", {html: "ilaç"}, "mymessage", {html: "+"}, "mymessage", {html: "sağlık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 55],"mymessage", {html: "+"}, "mymessage", {html: "çerçeve"}, "mymessage", {html: "+"}, "mymessage", {html: "sağlık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 56],"mymessage", {html: "+"}, "mymessage", {html: "çikolata"}, "mymessage", {html: "+"}, "mymessage", {html: "kakao"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 56],"mymessage", {html: "+"}, "mymessage", {html: "zımba"}, "mymessage", {html: "+"}, "mymessage", {html: "kakao"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 57],"mymessage", {html: "+"}, "mymessage", {html: "saksı"}, "mymessage", {html: "+"}, "mymessage", {html: "kaktüs"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 57],"mymessage", {html: "+"}, "mymessage", {html: "bilye"}, "mymessage", {html: "+"}, "mymessage", {html: "kaktüs"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 58],"mymessage", {html: "+"}, "mymessage", {html: "banyo"}, "mymessage", {html: "+"}, "mymessage", {html: "mutfak"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 58],"mymessage", {html: "+"}, "mymessage", {html: "ödev"}, "mymessage", {html: "+"}, "mymessage", {html: "mutfak"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 59],"mymessage", {html: "+"}, "mymessage", {html: "bambu"}, "mymessage", {html: "+"}, "mymessage", {html: "panda"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 59],"mymessage", {html: "+"}, "mymessage", {html: "komodin"}, "mymessage", {html: "+"}, "mymessage", {html: "panda"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 60],"mymessage", {html: "+"}, "mymessage", {html: "uzay"}, "mymessage", {html: "+"}, "mymessage", {html: "yıldız"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 60],"mymessage", {html: "+"}, "mymessage", {html: "tel"}, "mymessage", {html: "+"}, "mymessage", {html: "yıldız"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 61],"mymessage", {html: "+"}, "mymessage", {html: "bilgisayar"}, "mymessage", {html: "+"}, "mymessage", {html: "oyun"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 61],"mymessage", {html: "+"}, "mymessage", {html: "kahve"}, "mymessage", {html: "+"}, "mymessage", {html: "oyun"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 62],"mymessage", {html: "+"}, "mymessage", {html: "kapak"}, "mymessage", {html: "+"}, "mymessage", {html: "şişe"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 62],"mymessage", {html: "+"}, "mymessage", {html: "duvar"}, "mymessage", {html: "+"}, "mymessage", {html: "şişe"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 63],"mymessage", {html: "+"}, "mymessage", {html: "pergel"}, "mymessage", {html: "+"}, "mymessage", {html: "cetvel"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 63],"mymessage", {html: "+"}, "mymessage", {html: "saksı"}, "mymessage", {html: "+"}, "mymessage", {html: "cetvel"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 64],"mymessage", {html: "+"}, "mymessage", {html: "ray"}, "mymessage", {html: "+"}, "mymessage", {html: "tren"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 64],"mymessage", {html: "+"}, "mymessage", {html: "allık"}, "mymessage", {html: "+"}, "mymessage", {html: "tren"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_related", 65],"mymessage", {html: "+"}, "mymessage", {html: "hamur"}, "mymessage", {html: "+"}, "mymessage", {html: "ekmek"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["condition_unrelated", 65],"mymessage", {html: "+"}, "mymessage", {html: "zımba"}, "mymessage", {html: "+"}, "mymessage", {html: "ekmek"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }], 
[["filler", 201],"mymessage", {html: "+"}, "mymessage", {html: "hücre"}, "mymessage", {html: "+"}, "mymessage", {html: "turus"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 202],"mymessage", {html: "+"}, "mymessage", {html: "dosya"}, "mymessage", {html: "+"}, "mymessage", {html: "falpa"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 203],"mymessage", {html: "+"}, "mymessage", {html: "deniz"}, "mymessage", {html: "+"}, "mymessage", {html: "hales"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 204],"mymessage", {html: "+"}, "mymessage", {html: "çimen"}, "mymessage", {html: "+"}, "mymessage", {html: "çoran"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 205],"mymessage", {html: "+"}, "mymessage", {html: "bardak"}, "mymessage", {html: "+"}, "mymessage", {html: "tasuna"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 206],"mymessage", {html: "+"}, "mymessage", {html: "karpuz"}, "mymessage", {html: "+"}, "mymessage", {html: "taparu"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 207],"mymessage", {html: "+"}, "mymessage", {html: "ağaç"}, "mymessage", {html: "+"}, "mymessage", {html: "karna"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 208],"mymessage", {html: "+"}, "mymessage", {html: "çiçek"}, "mymessage", {html: "+"}, "mymessage", {html: "surun"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 209],"mymessage", {html: "+"}, "mymessage", {html: "çarşaf"}, "mymessage", {html: "+"}, "mymessage", {html: "palit"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 210],"mymessage", {html: "+"}, "mymessage", {html: "ak"}, "mymessage", {html: "+"}, "mymessage", {html: "çarul"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 211],"mymessage", {html: "+"}, "mymessage", {html: "bayrak"}, "mymessage", {html: "+"}, "mymessage", {html: "perlan"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 212],"mymessage", {html: "+"}, "mymessage", {html: "bilardo"}, "mymessage", {html: "+"}, "mymessage", {html: "rastak"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 213],"mymessage", {html: "+"}, "mymessage", {html: "telefon"}, "mymessage", {html: "+"}, "mymessage", {html: "lemün"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 214],"mymessage", {html: "+"}, "mymessage", {html: "pencere"}, "mymessage", {html: "+"}, "mymessage", {html: "tarpa"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 215],"mymessage", {html: "+"}, "mymessage", {html: "heykel"}, "mymessage", {html: "+"}, "mymessage", {html: "meşgür"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 216],"mymessage", {html: "+"}, "mymessage", {html: "ayva"}, "mymessage", {html: "+"}, "mymessage", {html: "püşür"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 217],"mymessage", {html: "+"}, "mymessage", {html: "havlu"}, "mymessage", {html: "+"}, "mymessage", {html: "temer"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 218],"mymessage", {html: "+"}, "mymessage", {html: "salıncak"}, "mymessage", {html: "+"}, "mymessage", {html: "petil"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 219],"mymessage", {html: "+"}, "mymessage", {html: "ayna"}, "mymessage", {html: "+"}, "mymessage", {html: "deref"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 220],"mymessage", {html: "+"}, "mymessage", {html: "koşu"}, "mymessage", {html: "+"}, "mymessage", {html: "telke"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 221],"mymessage", {html: "+"}, "mymessage", {html: "halka"}, "mymessage", {html: "+"}, "mymessage", {html: "lişmik"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 222],"mymessage", {html: "+"}, "mymessage", {html: "koyun"}, "mymessage", {html: "+"}, "mymessage", {html: "hattas"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 223],"mymessage", {html: "+"}, "mymessage", {html: "bilim"}, "mymessage", {html: "+"}, "mymessage", {html: "fırtıs"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 224],"mymessage", {html: "+"}, "mymessage", {html: "deney"}, "mymessage", {html: "+"}, "mymessage", {html: "fetes"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 225],"mymessage", {html: "+"}, "mymessage", {html: "katarsis"}, "mymessage", {html: "+"}, "mymessage", {html: "kıptıp"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 226],"mymessage", {html: "+"}, "mymessage", {html: "çehre"}, "mymessage", {html: "+"}, "mymessage", {html: "tincaz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 228],"mymessage", {html: "+"}, "mymessage", {html: "saygı"}, "mymessage", {html: "+"}, "mymessage", {html: "yolgat"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 229],"mymessage", {html: "+"}, "mymessage", {html: "çarşı"}, "mymessage", {html: "+"}, "mymessage", {html: "ipket"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 230],"mymessage", {html: "+"}, "mymessage", {html: "tepsi"}, "mymessage", {html: "+"}, "mymessage", {html: "balemut"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 231],"mymessage", {html: "+"}, "mymessage", {html: "tabak"}, "mymessage", {html: "+"}, "mymessage", {html: "kuçal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 232],"mymessage", {html: "+"}, "mymessage", {html: "sarkıt"}, "mymessage", {html: "+"}, "mymessage", {html: "olmut"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 233],"mymessage", {html: "+"}, "mymessage", {html: "sınav"}, "mymessage", {html: "+"}, "mymessage", {html: "bekvir"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 234],"mymessage", {html: "+"}, "mymessage", {html: "tahta"}, "mymessage", {html: "+"}, "mymessage", {html: "zamal"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 235],"mymessage", {html: "+"}, "mymessage", {html: "ayrı"}, "mymessage", {html: "+"}, "mymessage", {html: "fertik"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 236],"mymessage", {html: "+"}, "mymessage", {html: "avize"}, "mymessage", {html: "+"}, "mymessage", {html: "bazık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 237],"mymessage", {html: "+"}, "mymessage", {html: "araba"}, "mymessage", {html: "+"}, "mymessage", {html: "urkut"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 238],"mymessage", {html: "+"}, "mymessage", {html: "amaç"}, "mymessage", {html: "+"}, "mymessage", {html: "busgu"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 239],"mymessage", {html: "+"}, "mymessage", {html: "yanıt"}, "mymessage", {html: "+"}, "mymessage", {html: "tolsu"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 240],"mymessage", {html: "+"}, "mymessage", {html: "mısır"}, "mymessage", {html: "+"}, "mymessage", {html: "barıca"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 241],"mymessage", {html: "+"}, "mymessage", {html: "muz"}, "mymessage", {html: "+"}, "mymessage", {html: "merik"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 242],"mymessage", {html: "+"}, "mymessage", {html: "paket"}, "mymessage", {html: "+"}, "mymessage", {html: "hukur"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 243],"mymessage", {html: "+"}, "mymessage", {html: "matara"}, "mymessage", {html: "+"}, "mymessage", {html: "gehveç"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 244],"mymessage", {html: "+"}, "mymessage", {html: "çeşme"}, "mymessage", {html: "+"}, "mymessage", {html: "sumluk"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 245],"mymessage", {html: "+"}, "mymessage", {html: "sipsi"}, "mymessage", {html: "+"}, "mymessage", {html: "gumdan"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 246],"mymessage", {html: "+"}, "mymessage", {html: "manav"}, "mymessage", {html: "+"}, "mymessage", {html: "darlam"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 247],"mymessage", {html: "+"}, "mymessage", {html: "kasap"}, "mymessage", {html: "+"}, "mymessage", {html: "pendir"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 248],"mymessage", {html: "+"}, "mymessage", {html: "boru"}, "mymessage", {html: "+"}, "mymessage", {html: "terset"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 249],"mymessage", {html: "+"}, "mymessage", {html: "köşe"}, "mymessage", {html: "+"}, "mymessage", {html: "künfer"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 250],"mymessage", {html: "+"}, "mymessage", {html: "kuruntu"}, "mymessage", {html: "+"}, "mymessage", {html: "gacık"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 251],"mymessage", {html: "+"}, "mymessage", {html: "çakışma"}, "mymessage", {html: "+"}, "mymessage", {html: "sahir"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 252],"mymessage", {html: "+"}, "mymessage", {html: "kumpas"}, "mymessage", {html: "+"}, "mymessage", {html: "tarkuz"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 253],"mymessage", {html: "+"}, "mymessage", {html: "saman"}, "mymessage", {html: "+"}, "mymessage", {html: "şırpan"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 254],"mymessage", {html: "+"}, "mymessage", {html: "havlu"}, "mymessage", {html: "+"}, "mymessage", {html: "sün"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 255],"mymessage", {html: "+"}, "mymessage", {html: "şarapnel"}, "mymessage", {html: "+"}, "mymessage", {html: "tarapil"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 256],"mymessage", {html: "+"}, "mymessage", {html: "seçim"}, "mymessage", {html: "+"}, "mymessage", {html: "kalpuk"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
[["filler", 257],"mymessage", {html: "+"}, "mymessage", {html: "meyve"}, "mymessage", {html: "+"}, "mymessage", {html: "çurtan"}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }]   ];