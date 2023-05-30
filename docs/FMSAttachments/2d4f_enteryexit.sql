SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
 
 	
 
DECLARE @Custid int
DECLARE @bbid varchar(100)

--create table #temptable(
--bbid varchar(20),
--[status] int

--)

 DECLARE PrintCustomers CURSOR READ_ONLY --------------------------------------------------------- Cursor 1( getting bbid and custid id from ht_main)
 FOR
   select m.bbid , m.CustId from ht_cust  c inner join ht_main m on c.custid = m.custid where  c.custid=7615  and m.activate=1 and m.VehName not like '%<del>%' and m.IsDeleted=0  order by c.custid desc
      --OPEN CURSOR.
      OPEN PrintCustomers
 
      --FETCH THE RECORD INTO THE VARIABLES.
      FETCH NEXT FROM PrintCustomers INTO
      @bbid,@Custid
 

 --insert into #temptable select @bbid,0
      --LOOP UNTIL RECORDS ARE AVAILABLE.
      WHILE @@FETCH_STATUS = 0
      BEGIN

            	 
	/* ==== Variable Declaration to run dynamic query for device id inside the loop ==== */
declare @objcursor as cursor --------------------------------------------------------------------- Cursor 2
 
declare 
    @vsql        as nvarchar(max)
	,@vquery    as nvarchar(max)
    ,@value        as varchar(50)
	,@Dlat        as varchar(50)
	,@Dlongi       as varchar(50)
	,@Date       as Datetime
    
 
/* ==== Sample device Table dynamically fetching data from db ==== */
set @vquery = 'SELECT DataDate,latitude,longitude from '+@bbid+' where DATEDIFF(MINUTE, datadate, GETDATE()) <= 15 and speed >0 ORDER BY datadate'
set @vsql = 'set @cursor = cursor forward_only static for ' + @vquery + ' open @cursor;'

exec sys.sp_executesql
    @vsql
    ,N'@cursor cursor output'
    ,@objcursor output
 
fetch next from @objcursor into @Date,@Dlat,@Dlongi
while (@@fetch_status = 0)
begin


			Declare @ID int
			Declare @lat decimal(16,2),@longi  decimal(16,2),@details varchar(100)
			
DECLARE PrintCustomersinner CURSOR READ_ONLY ------------------------------------------------------------------------------------- Cursor 3
 FOR
 SELECT id,lat,longi,details  FROM [dbo].[ht_cust_latlong] where Custid=@Custid and  isactive=1 order by longi
      --OPEN CURSOR.
      OPEN PrintCustomersinner
 
      --FETCH THE RECORD INTO THE VARIABLES.
      FETCH NEXT FROM PrintCustomersinner INTO
      @ID,@lat,@longi,@details
 
      --LOOP UNTIL RECORDS ARE AVAILABLE.
      WHILE @@FETCH_STATUS = 0
      BEGIN
	  

  declare @distance int,@stat int
  select @distance=dbo.GetLatLongDistance(@Dlat,@Dlongi, @lat, @longi, 'Meters') 


  if (@distance <200)
  begin

declare @SqlString nvarchar(2000)
  set @SqlString = 'Enterpoitesting '''+@details+''','''+convert(varchar,@Date)+''','+CAST(@Custid AS VARCHAR(5))+','+@bbid+','+CAST(@ID AS VARCHAR(5))
--EXEC sp_executesql @SqlString, N'@POIName varchar(300), @datetime DATETIME,@Custid int,@BBID VARCHAR(50),@POIId  int',@details,@Date,@Custid,@bbid,@ID;

exec(@SqlString)

  --select @stat=[status] from #temptable where bbid=@bbid
  --if (@stat=0)
  --begin
  --print(@distance)
  --print(@Date)
  -- print(@bbid)
  --print('in')
  --update #temptable set [status]=1 where bbid=@bbid
  --end 
 end
else if (@distance > 200 and  @distance < 2200)
begin

declare @Sqlexitpoi nvarchar(2000)
  set @Sqlexitpoi = 'UpdateEnPOI '''+@details+''','''+convert(varchar,@Date)+''','+CAST(@Custid AS VARCHAR(5))+','+@bbid+','+CAST(@ID AS VARCHAR(5))


exec(@Sqlexitpoi)

--exec Enterpoinew
----select @stat=[status] from #temptable where bbid=@bbid
----  if (@stat=1)
----  begin
----  print(@distance)
----  print(@Date)
----print(@bbid)
----print('out')
----update #temptable set [status]=0 where bbid=@bbid
--end
end


   FETCH NEXT FROM PrintCustomersinner INTO
               @ID,@lat,@longi,@details
      END
 
      CLOSE PrintCustomersinner
      DEALLOCATE PrintCustomersinner

    fetch next from @objcursor into @Date,@Dlat,@Dlongi
end
 
close @objcursor
deallocate @objcursor


print(@Custid)
             FETCH NEXT FROM PrintCustomers INTO
              @bbid,@Custid
      END
 
      CLOSE PrintCustomers
      DEALLOCATE PrintCustomers

	  --drop table #temptable

