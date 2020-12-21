import pandas as pd
import urllib.request
import numpy as np
from urllib.error import HTTPError
import pymysql
#from datetime import date
from datetime import datetime

con = pymysql.connect(host="127.0.0.1", user="root", passwd="", db="user_gefion")
con.select_db('user_gefion')

pd.set_option('display.min_rows', 50)
pd.set_option('display.max_rows', 200)


def att_indice(index):
    cursor = con.cursor()
    url = \
        'http://bvmf.bmfbovespa.com.br/indices/ResumoCarteiraTeorica.aspx?Indice={}&idioma=pt-br'.format(
            index.upper())
    while(True):
        try:
            tabela = (pd.read_html(url, decimal=',', thousands='.')[0])[:-1]
            break
        except HTTPError as e:

            break
    Group_ID = index
    Date = datetime.today().strftime("%Y/%m/%d")

    for i in range (len(tabela)): 
        CodAcao = tabela['Código'][i]
        QtdTeori = tabela['Qtde. Teórica'][i]
        Part = float(tabela['Part. (%)'][i])   
        #print(Group_ID + " " + str(Date) + " " + CodAcao + " " + str(QtdTeori) + " " + str(Part))
        cursor.execute('INSERT INTO stocks_quantity (Group_ID, ID, Date, Quantity, Part) VALUES (%s,%s,%s,%s,%s)', (Group_ID,CodAcao,Date,QtdTeori,Part))        
    con.commit()    
    #tabela = tabela.sort_values('Part. (%)', ascending=False)
    
    #tabela.to_csv(r'geral.txt', sep=';', mode='a')
    #print(tabela)
att_indice('BDRX')
att_indice('IBOV')
att_indice('IBRA')
att_indice('IBXL')
att_indice('ICO2') 
att_indice('ICON')
att_indice('IDIV')
att_indice('IEEX')
att_indice('IFIX')
att_indice('IFNC')
att_indice('IGCT')
att_indice('IGCX')
att_indice('IGNM')
att_indice('IMAT')
att_indice('IMOB')
att_indice('INDX')
att_indice('ISEE')
att_indice('ITAG')
att_indice('IVBX')
att_indice('MLCX')
att_indice('SMLL')
att_indice('UTIL')
