function DB(database_name)
{
  this.db=null;
};

DB.prototype.isSuperDB = function()
{
  return (window.openDatabase);
}

DB.prototype.open = function()
{
  if(!window.openDatabase)  return;
  try
  {
    if(this.db==null)
      this.db = openDatabase("MoneyNote", "1.0", "記帳軟體", 5*1024*1024);    
  }
  catch (err)
  {
    alert('無法建立資料庫');
    this.db=null;
  }
}
DB.prototype.execute=function(sql,t,u,f)
{
  if(!window.openDatabase || this.db==null)  return;

  var fun_error=null;
  var fun=null;
  var p=null;

  if(typeof(t)=='object')
  {
    p=t;
    if(typeof(u)=='function')
    {
      fun=u;
      if(typeof(f)=='function')
        fun_error=f;
    }
  }
  else
  {
    if(typeof(t)=='function')
    {
      fun=t;
      if(typeof(u)=='function')
        fun_error=u;
    }
  }

  if(p!=null)
  {
    if(fun!=null)
    {      
      this.db.transaction(function(tx){
        tx.executeSql(sql,p,
          function(tx,result){
            fun(result);
          },
          function(tx, error){
            //alert(sql);
            if(fun_error!=null)
              fun_error(tx,error);
            return;
        });
      });

    }
    else
      this.db.transaction(function(tx){ tx.executeSql(sql,p); });
  }
  else
  {
    if(fun!=null)
    {      
      this.db.transaction(function(tx){
        tx.executeSql(sql,[],
          function(tx,result){
            fun(result);
          },
          function(tx, error){
            //alert(sql);
            if(fun_error!=null)
              fun_error(tx,error);
            return;
        });
      });
    }
    else
      this.db.transaction(function(tx){ tx.executeSql(sql,[]); });
  }
}

var db = new DB();

function checkSuperDB(){ 
  if(!db.isSuperDB())
  {
    var s="";
    s+="<div id='alert_msg' class='ui-widget'>";
    s+="<div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'>";
    s+="<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>";
    s+="<strong>Alert:</strong>&nbsp;<span id='content'>很抱歉,你的瀏覽器並不支援資料庫. IE使用者可於安裝<a href='http://www.google.com/chromeframe'>Google Frame</a>後使用.</span>";
    s+="</div>";
    s+="</div><!-- alert_msg -->";
    document.getElementsByTagName("body")[0].innerHTML = s;
  }
}