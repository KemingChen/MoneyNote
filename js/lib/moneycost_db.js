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

  console.log("Run SQL: " + sql);
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
    {
      this.db.transaction(function(tx){ tx.executeSql(sql,p,
        function(tx,result){
            //fun(result);
        },
        function(tx, error){
            console.log(error);
            if(fun_error!=null)
              fun_error(tx,error);
            return;
        });
      });
    }
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
    {
      this.db.transaction(function(tx){ tx.executeSql(sql,[],
        function(tx,result){
            //fun(result);
        },
        function(tx, error){
            console.log(error);
            if(fun_error!=null)
              fun_error(tx,error);
            return;
        });
      });
    }
  }
}