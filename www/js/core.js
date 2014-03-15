angular.module('MoneyNote.services', [])

// MoneyNote Dababase
.factory('MNDB', function($rootScope, $ionicModal, $filter){
    //以下為 Setting TimeRange 實做 ==================
    var now = new Date();
    var settingConfirmcallback = undefined;
    var settingBtn = {
        type: 'button-positive',
        content: '<i class="ion-gear-a"></i>',
        tap: function(e) {
            $rootScope.modal.show();
        }
    };

    $rootScope.data = {
        start: "",
        end: "",
    }

    $ionicModal.fromTemplateUrl('selectTimeRange.html', function(modal) {
        $rootScope.modal = modal;
    }, {
        scope: $rootScope,
        animation: 'slide-in-up',
    }); 
    
    $rootScope.closeSetting = function(){
        $rootScope.modal.hide();
    }

    $rootScope.confirmSetting = function(){
        if(checkValid()){
            $rootScope.modal.hide();
            settingConfirmcallback();
        }
    }

    $rootScope.choose = function(action){
        if(action == "today"){
            $rootScope.data.start = $filter('date')(now, "yyyy-MM-dd");
            $rootScope.data.end = $filter('date')(now, "yyyy-MM-dd");
        }
        else if(action == "month"){
            $rootScope.data.start = $filter('date')(new Date(
                now.getFullYear(), 
                now.getMonth(),
                1 ), "yyyy-MM-dd");
            $rootScope.data.end = $filter('date')(new Date(
                now.getFullYear(), 
                now.getMonth() + 1,
                0 ), "yyyy-MM-dd");
        }
        else if(action == "year"){
            $rootScope.data.start = $filter('date')(new Date(
                now.getFullYear(), 
                0,
                1 ), "yyyy-MM-dd");
            $rootScope.data.end = $filter('date')(new Date(
                now.getFullYear() + 1, 
                0,
                0 ), "yyyy-MM-dd");
        }
    }

    $rootScope.onChanged = function(tag, value){
        if(tag == "start"){
            $rootScope.data.start = value;
        }
        else if(tag == "end"){
            $rootScope.data.end = value;
        }
    }

    function checkValid(){
        if(!$rootScope.data.start.match(/\d{4}-\d{2}-\d{2}/)){
            alert("起始時間格式有誤!!!");
            return false;
        }
        if(!$rootScope.data.end.match(/\d{4}-\d{2}-\d{2}/)){
            alert("結束時間格式有誤!!!");
            return false;
        }

        var start = new Date($rootScope.data.start);
        var end = new Date($rootScope.data.end);
        
        if(end.getTime() < start.getTime()){
            alert("起始時間有誤!!!");
            return false;
        }

        timeRange.start = $rootScope.data.start;
        timeRange.end = $rootScope.data.end;

        return true;
    }

    function getSettingBtn(callback){
        settingConfirmcallback = callback;
        return settingBtn;
    }

    //以下為 DB Service ==============================
    var db = getDatabase();
    var timeRange = {
        start: $filter('date')(now, "yyyy-MM-dd"),
        end: $filter('date')(now, "yyyy-MM-dd"),
    }

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

    function cleanAllItem(callback){
        if(confirm('是否完全清除過去所有項目?'))
        {
            db.open();
            db.execute('DROP table if exists MoneyNote');
            db.execute('DROP table if exists MoneyClass');
            db = getDatabase();

            // 置入假資料
            addClass("娛樂", 0);// ClassId = 1
            addClass("工作", 1);// ClassId = 2
            addClass("零用錢", 1);// ClassId = 3
            addClass("早餐", 0);// ClassId = 4
            addClass("午餐", 0);// ClassId = 5
            addClass("晚餐", 0);// ClassId = 6

            addItem(1, 300, "打保齡球", "2014-03-01");
            addItem(3, 1000, "3月份的錢", "2014-03-01");
            addItem(4, 50, "漢堡", "2014-03-02");
            addItem(5, 80, "雞腿飯", "2014-03-02");
            addItem(6, 60, "拉麵", "2014-03-02");
            addItem(2, 400, "", "2014-03-08");
            addItem(2, 2000, "MoneyNote 設計", "2014-03-11");
            addItem(2, 100, "麵店打工", "2014-03-15");
            addItem(4, 50, "", "2014-03-15");
            addItem(5, 80, "排骨飯", "2014-03-15");
            addItem(6, 60, "豚骨拉麵", "2014-03-15");

            if(callback){
                callback();
            }
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
        var stintString = " AND time BETWEEN '" + timeRange.start + "' AND '" + timeRange.end + "'";
        db.open();

        //console.log(restriction);
        if(restriction !== undefined){
            //stintString += restriction.time !== undefined ? " AND time " + restriction.time : "";
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
        db.execute('update MoneyClass set title=?, property=? where ckey=' + ckey + '', [title, property]);
    }

    function deleteClass(ckey, callback)
    {
        db.open();
        db.execute('delete from MoneyClass where ckey=' + ckey + '', function(){
            db.execute('delete from MoneyNote where classId=' + ckey + '');
            if(callback !== undefined){
                selectClasses(callback);
            }
        });
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
        getSettingBtn: getSettingBtn,
    }
})

.factory('google', function(){
    return google;
});