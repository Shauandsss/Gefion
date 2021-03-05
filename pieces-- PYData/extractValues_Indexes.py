from yahooquery import Ticker
import pymysql
from datetime import date

con = pymysql.connect(host="127.0.0.1", user="root", passwd="", db="user_gefion")
con.select_db('user_gefion')

def att_indice(index):
    cods = {
        "IBOV": "^BVSP",
        "BDRX": "BRDX.SA",
        "IBRA": "IBRA.SA",
        "IBXL": "^IBX50",
        "ICO2": "ICO2.SA",
        "ICON": "ICON",
        "IDIV": "IDIV.SA",
        "IEEX": "IEEXU.PA",
        "IFIX": "IFIX.SA",
        "IFNC": "IFNC.SA",
        "IGCT": "IGCT.SA",
        "IGCX": "^IGCX",
        "IGNM": "IGNM.SA",
        "IMAT": "IMAT.SA",
        "IMOB": "IMOB.SA",
        "ISEE": "ISEE.SA",
        "ITAG": "ITAG.SA",
        "IVBX": "^IVBX",
        "MLCX": "MLCX.SA",
        "SMLL": "SMLL.SA",
    }
    petr = Ticker(cods[index])
    Cod = petr.history(start='2021-02-13')
    cursor = con.cursor()
    for i in range (len(Cod)): 
        CodAcao = index
        Date = (Cod.index[i][1])
        Value = float(Cod['close'][i])
        print(str(CodAcao) + ' ' + str(Date) + ' ' + str(Value))
        if str(Value) != 'nan':
          cursor.execute('INSERT INTO stocks_value (ID, Date, Value_close) VALUES (%s,%s,%s)', (CodAcao, Date, Value))
    con.commit()


att_indice('IBOV')
att_indice('ICON')
att_indice('IBXL')
att_indice('IVBX')







# Listado apenas atual
# att_indice('IMAT')
# att_indice('IMOB')
# att_indice('IGNM')
# att_indice('IGCX')
# att_indice('MLCX')
# att_indice('SMLL')
# att_indice('IBRA')
# att_indice('ICO2') 
# att_indice('IDIV')
# att_indice('IEEX')
# att_indice('IFIX')
# att_indice('IFNC')
# att_indice('IGCT')
# att_indice('ISEE')
# att_indice('ITAG')

# Não Listado
# att_indice('BDRX')
# att_indice('INDX')
# att_indice('UTIL')