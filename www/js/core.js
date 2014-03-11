var MoneyNote = (function(){
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
            // MoneyClass-property 0:收入, 1:支出
        }

        console.log("Database init!!!");
        return db;
    }

    function cleanAllItem(){
        if(confirm('是否完全清除過去所有項目?'))
        {
            db.open();
            //db.execute('TRUNCATE table if exists MoneyNote');
            db.execute('DROP table if exists MoneyNote');
            db.execute('DROP table if exists MoneyClass');
        }
    }

    function addItem(classId, cost, note, time){
        console.log([ null, time, classId, cost, note ]);
        db.open();
        db.execute('insert into MoneyNote values (?, ?, ?, ?, ?)', [ null, time, classId, cost, note ]);
    }

    function updateItem(ikey, classId, cost, note, time)
    {
        db.open();
        db.execute('update MoneyNote set classId=?, cost=?, note=?, time=? where ikey=' + ikey + '', [ classId, cost, note, time ]);
    }

    function deleteItem(ikey)
    {
        db.open();
        db.execute('delete from MoneyNote where ikey=' + ikey + '');
    } 

    function selectItems(){
        db.open();//, MoneyClass where classId=ckey order by time desc, ikey desc
        db.execute('select ikey, time, classId, cost, note from MoneyNote', function(result){
            console.log(result.rows);
            for(var i = 0; i < result.rows.length; i++){
                console.log(result.rows.item(i));
            }
        });
    }

    return{
        clean: cleanAllItem,
        addItem: addItem,
        updItem: updateItem,
        delItem: deleteItem,
        selectItems: selectItems,
    }
})();