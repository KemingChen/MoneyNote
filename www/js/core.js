angular.module('MoneyNote.services', [])

// MoneyNote Dababase
.factory('MNDB', function(){
    var object;
    var db = getDatabase();

    function getDatabase(){
        var db = new DB();

        if(!db.isSuperDB()){
            var s="";
            s+="<div id='alert_msg' class='ui-widget'>";
            s+="<div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'>";
            s+="<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>";
            s+="<strong>Alert:</strong>&nbsp;<span id='content'>很抱歉,你的瀏覽器並不支援資料庫. IE使用者可於安裝<a href='http://www.google.com/chromeframe'>Google Frame</a>後使用.</span>";
            s+="</div>";
            s+="</div><!-- alert_msg -->";
            $("body").html(s);
        }
        else{
            db.open();
            db.execute('create table if not exists MoneyNote (ikey INTEGER PRIMARY KEY AUTOINCREMENT, time int, classId int, cost float, note text)');
            db.execute('create table if not exists MoneyClass (ckey INTEGER PRIMARY KEY AUTOINCREMENT, title text, property int)');
            // MoneyClass-property 0:支出, 1:收入
            /*
            MoneyNote{
                ikey INTEGER PRIMARY KEY AUTOINCREMENT,
                time (int),
                classId (int),
                cost (float),
                note (text)
            }

            MoneyClass{
                ckey INTEGER PRIMARY KEY AUTOINCREMENT,
                title (text),
                property (int)
            }
            */
        }

        console.log("Database init!!!");
        return db;
    }

    function cleanAllItem(){
        if(confirm('是否完全清除過去所有項目?'))
        {
            db.open();
            db.execute('DROP table if exists MoneyNote');
            db.execute('DROP table if exists MoneyClass');
            db = getDatabase();

            // 置入假資料
            addClass("娛樂", 0);
            addClass("工作", 1);
            addClass("零用錢", 1);
            addClass("早餐", 0);
            addClass("午餐", 0);
            addClass("晚餐", 0);
        }
    }

    function addItem(classId, cost, note, time){
        db.open();
        db.execute('insert into MoneyNote values (?, ?, ?, ?, ?)', [ null, time, classId, cost, note ]);
    }

    function updateItem(ikey, classId, cost, note, time)
    {
        db.open();
        db.execute('update MoneyNote set classId=?, cost=?, note=?, time=? where ikey=' + ikey + '', [ classId, cost, note, time ]);
    }

    function deleteItem(ikey, callback)
    {
        db.open();
        db.execute('delete from MoneyNote where ikey=' + ikey + '', function(){
            if(callback !== undefined){
                selectItems(callback);
            }
        });
    } 

    function selectItems(callback, restriction){
        var array = [];
        var stintString = "";
        db.open();

        //console.log(restriction);
        if(restriction !== undefined){
            stintString += restriction.time !== undefined ? " AND time " + restriction.time : "";
            stintString += restriction.ikey !== undefined ? " AND ikey " + restriction.ikey : "";
        }
        //console.log(stintString);

        db.execute('select ikey, time, classId, cost, note, ckey, title, property from MoneyNote, MoneyClass where classId=ckey' + stintString, function(result){
            //console.log(result.rows);
            for(var i = 0; i < result.rows.length; i++){
                //console.log(result.rows.item(i));
                var item = result.rows.item(i);
                array.push(item);
            }
            console.log("Items: ");
            console.log(array);
            callback(array);
        });
        return array;
    }
    
    function addClass(title, property){
        console.log([title, property]);
        db.open();
        db.execute('insert into MoneyClass values (?, ?, ?)', [ null, title, property ]);
    }

    function updateClass(ckey, title, property)
    {
        db.open();
        db.execute('update MoneyClass set title=?, property=? where ckey=' + ckey + '', [ckey, title, property]);
    }

    function deleteClass(ckey)
    {
        db.open();
        db.execute('delete from MoneyClass where ckey=' + ckey + '');
    } 

    function selectClasses(callback){
        var array = [];
        db.open();
        db.execute('select ckey, title, property from MoneyClass', function(result){
            //console.log(result.rows);
            for(var i = 0; i < result.rows.length; i++){
                //console.log(result.rows.item(i));
                var item = result.rows.item(i);
                array.push(item);
            }
            console.log("Classes: ");
            console.log(array);
            callback(array);
        });
    }

    return{
        clean: cleanAllItem,
        addItem: addItem,
        updItem: updateItem,
        delItem: deleteItem,
        selectItems: selectItems,
        addClass: addClass,
        updClass: updateClass,
        delClass: deleteClass,
        selectClasses: selectClasses,
        object: object,
    }
})

.factory('google', function(){
    return google;
});