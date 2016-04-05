
//  Количество вопросов, которые нужно выбирать
var QuestionCount = Number(5);

//  Создает кнопки для ответов
var MaxQuestionAnswers  = 5;


//  1 - Все вопросы видны сразу
//  2 - Вопросы появляеются по мере ответа 
var QuestionCallBackStrategy = Number(1);
//var QuestionCallBackStrategy = Number(2);


//  Список вопросов
//  Ответ для вопроса нужно указывать, как строку - чувствительна к регистру
//  Количество ответов может быть любое
var QuestionInstanceList = new Array
(
    {
        Answer: '2016',
        Question: 'Какой сейчас год?',
        Response: new Array
        (
            '2014', '2015', '2016', '2019'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 1?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 2?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 3?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    
    {
        Answer: 'Москва',
        Question: 'Столица России 4?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    
    {
        Answer: 'Москва',
        Question: 'Столица России 5?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 6?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 7?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 8?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Москва',
        Question: 'Столица России 9?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    },
    
    {
        Answer: 'Спб',
        Question: 'Столица России 10?',
        Response: new Array
        (
            'Москва', 'Спб', 'Ростов', 'Киев'
        )
    }
    
);

var QuestionRandomList;
var QuestionAnswerList;

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}


$( document ).ready(function() 
{
    console.log( "ready!" );
    
    QuestionRandomList = getRandomArrayElements(QuestionInstanceList, QuestionCount);
    QuestionAnswerList = new Array();
    
    $( "#QuestList" ).html('');
    $( "#QuestForm" ).html('');

    
    for(i = 1; i <= MaxQuestionAnswers; i++)
    {
        $('<a id="QuestAnswer' + i + '" class="btn btn-lg btn-warning" href="#" role="button">{Ответ еще не инициализировался}</a>').appendTo("#QuestForm");
    }
    
    if(QuestionCallBackStrategy === 1)
    {
        for(var i in QuestionRandomList) 
        {    
            var qe = QuestionRandomList[i];
            var idx = Number(i) + 1;
            $('<li class="list-group-item"> [Вопрос №' + idx + ' ] ' + qe.Question + '</li>').appendTo("#QuestList");
        }
    }
    QuestionAfterIndex(0);    
});

function QuestionAfterIndex(QuestionIndex)
{
    // Переобразовываем QuestionIndex в число
    QuestionIndex = Number(QuestionIndex);
    var QuestionCounter = QuestionIndex + 1;
    var QuestionInstance = QuestionRandomList[QuestionIndex];
    
    //  Меняем заголовок вопроса
    $( "#QuestTitle" ).text('Вопрос №' + QuestionCounter + '. ' + QuestionInstance.Question);
    
    //  Добавляем ответы
    var ResponseCounter = 1;
    QuestionInstance.Response.forEach(function(response) {
        var ButtonName = "#QuestAnswer" + ResponseCounter;
        var OnClickAttrib = "QuestionTryAnswer(" + QuestionIndex + ",'" + response + "');";

        $( ButtonName ).text(response);
        $( ButtonName ).attr('onclick', OnClickAttrib);
        ResponseCounter++;
    });
    
    //  Скрываем не использованные кнопки
    for(var r = MaxQuestionAnswers; r >= ResponseCounter; r-- )
    {
        var ButtonName = "#QuestAnswer" + r;
        $( ButtonName ).hide();
    }
    
    
    //  [Стратегия]: 2й способ отображения вопросов - по мере ответа
    if(QuestionCallBackStrategy === 2)
    {
        $('<li class="list-group-item"> [Вопрос №' + QuestionCounter + ' ] ' + QuestionInstance.Question + '</li>').appendTo("#QuestList");
    }
    
 
    $( "#QuestIndex" ).text(QuestionIndex);
    
    //  Выделяем текущий вопрос
    $( "#QuestList" ).children().eq(QuestionIndex).attr('class', 'list-group-item btn-primary');
}

var BlobQuestionResultTxt;
var BlobQuestionResultXls;

function QuestionTryAnswer(QuestionIndex, QuestionAnswerString)
{    
    QuestionIndex = Number(QuestionIndex);
    var QuestionCounter = QuestionIndex + 1;
    var QuestionInstance = QuestionRandomList[QuestionIndex];

    if(QuestionInstance.Answer == QuestionAnswerString)
    {
        $( "#QuestList" ).children().eq(QuestionIndex).attr('class', 'list-group-item btn-success');
        QuestionAnswerList[QuestionIndex] = true;
    }
    else
    {
        $( "#QuestList" ).children().eq(QuestionIndex).attr('class', 'list-group-item btn-danger');
        QuestionAnswerList[QuestionIndex] = false;
    }

    if (QuestionCounter < QuestionRandomList.length)
    {
        QuestionAfterIndex(QuestionCounter);
    }
    else
    {
        $( "#QuestForm" ).attr('style', 'display: none;');
        $( "#QuestResultList" ).attr('style', '');

        $( "#QuestResultList" ).html('');
        
        BlobQuestionResultTxt = 'Результат тестирования: \r\n';
        
        var SuccessAnswerCount = 0;
        for(var i in QuestionRandomList) 
        {
            QuestionCounter = Number(i) +1;
            var QuestionResult = QuestionAnswerList[i];
            QuestionInstance = QuestionRandomList[i];
            
            var QuestionRow = '[Вопрос №' + QuestionCounter + ' ] ' + QuestionInstance.Question;
            
            if(QuestionResult === true)
            {
                $('<li class="list-group-item btn-success">' + QuestionRow + '</li>').appendTo("#QuestResultList");
                BlobQuestionResultTxt = BlobQuestionResultTxt + '+ ' + QuestionRow + ' = правильно \r\n';
                SuccessAnswerCount++;
            }
            else
            {
                $('<li class="list-group-item btn-danger">' + QuestionRow + '</li>').appendTo("#QuestResultList");
                BlobQuestionResultTxt = BlobQuestionResultTxt + '- ' + QuestionRow + ' = не правильно \r\n';
            }
        }
        
        BlobQuestionResultTxt = BlobQuestionResultTxt + '\r\n Всего вопросов: ' + QuestionRandomList.length;
        BlobQuestionResultTxt = BlobQuestionResultTxt + '\r\n Правильных ответов: ' + SuccessAnswerCount;

        
        $("#ButtonSaveTxt").show();
        //$("#ButtonSaveXls").show();

        $( "#QuestTitle" ).text('Результат тестирования: ' + SuccessAnswerCount + ' из ' + QuestionRandomList.length );
    }
}


$("#ButtonSaveTxt").on('click', function (event) {

    var blob = new Blob([BlobQuestionResultTxt], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Angle Test Result.txt");
});

/*
$("#ButtonSaveXls").on('click', function (event) {
    var blob = new Blob([BlobQuestionResultXls], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Angle Test Result.xls");
});*/