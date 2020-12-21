#!/usr/bin/python
# -*- coding: utf-8 -*-
import pandas as pd

def get_values():
    index = 'SMLL'
    pd.set_option('display.min_rows', 50)
    pd.set_option('display.max_rows', 200)
    url = \
        'http://bvmf.bmfbovespa.com.br/indices/ResumoCarteiraTeorica.aspx?Indice={}&idioma=pt-br'.format(
            index.upper())

    tabela = (pd.read_html(url, decimal=',', thousands='.',
                           index_col='Código')[0])[:-1]
    tabela = tabela.sort_values('Part. (%)', ascending=False)
    arquivo = open('geral.txt', 'a')
    arquivo.writelines(tabela)
    print(tabela)
    arquivo.close()
get_values()