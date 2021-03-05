from yahooquery import Ticker
import pymysql
from datetime import date

con = pymysql.connect(host="127.0.0.1", user="root", passwd="", db="user_gefion")
con.select_db('user_gefion')

def att_indice(index):
    petr = Ticker(index)
    Cod = petr.history(start='2021-02-12')
    print(Cod)
    if str(Cod)[-39::] == "No data found, symbol may be delisted'}":
      return
    cursor = con.cursor()
    for i in range (len(Cod)): 
        CodAcao = index[:-3]
        Date = (Cod.index[i][1])
        Value = float(Cod['close'][i])
        print(str(CodAcao) + ' ' + str(Date) + ' ' + str(Value))
        #if str(Value) != 'nan':
        #  cursor.execute('INSERT INTO stocks_value (ID, Date, Value_close) VALUES (%s,%s,%s)', (CodAcao, Date, Value))        
    con.commit()    

def selectStocks():
    with con.cursor() as cursor:
      # Read a single record
      sql = "SELECT DISTINCT id FROM STOCKS_QUANTITY"
      cursor.execute(sql)
      result = cursor.fetchall()
      for x in range(len(result)):
        cod = str(result[x]).replace("',)", "")
        cod = str(cod).replace("('", "")
        att_indice(str(cod) + ".SA")
att_indice('WEGE3.SA')
#att_indice('BDRX')
#att_indice('IBRA')
#att_indice('IBXL')
#att_indice('IBOV')
#att_indice('ICO2') 
#att_indice('ICON')
#att_indice('IDIV')
#att_indice('IEEX')
#att_indice('IFIX')
#att_indice('IFNC')
#att_indice('IGCT')
#att_indice('IGCX')
#att_indice('IGNM')
#att_indice('IMAT')
#att_indice('IMOB')
#att_indice('INDX')
#att_indice('ISEE')
#att_indice('ITAG')
#att_indice('IVBX')
#att_indice('MLCX')
#att_indice('SMLL')
#att_indice('UTIL')
#