# text brez sumnikov

str = "DETA JG ZŠJF, JG MJČGUJŠ ZŠJF, NJOFJM KG IJB ANBATK, TAUE NREPE! GJ IAT PE CE HBAIŽH SRKSJB, GJ IAT PE Š PŽTIGKZA DK NJB, ANBATK PE, ANBATK, NREPE! UEC IAT BUŽNJT SADBEB FE ZŠJF, ŠDEHATŽR, HK GE HRKV SRKSJF FRSK Š SATBENK FJU. KG PBJU, FE NRAIGK MJČGUJŠ ZŠJF IA Š GUKO KCIRKDEB TEBANŽČUE DBJN KG DSJF RECVERKB FAVGK UKT SAPBJN. DETA JG IJB, JG MJČGUJŠ ZŠJF ANBATK, TAUE NREPE, DEU ŠJČ, HEHA ŠDEH FEH SACNREŠ MBAŠJHŽ CE RJČJFHETK SATEPE."
str_without_split = str.replace(",", "").replace(
    ".", "").replace("?", "").replace("!", "") .replace("Č", "X").replace("Š", "Y").replace("Ž", "W")
str = str_without_split.split()


def doStat(list):
    stat = {}
    list = [x for x in list if ' ' not in x]
    len_sorted_list, no_duplicates = len(list), set(list)
    stat = {x: (list.count(x)/len_sorted_list*100)
            for x in no_duplicates}

    stat = dict(sorted(stat.items(),
                       key=lambda x: x[1], reverse=True))
    print('\n'.join('{} -> {}'.format(k, v) for k, v in stat.items()))


##########
print("###koncnice###")
zadnje_crke = [x[-1] for x in str]
doStat(zadnje_crke)
##########

##########
print("###zacetnice###")
zacetne_crke = [x[0] for x in str]
doStat(zacetne_crke)
##########

##########
print("###Samostojne crke###")
samostojne_crke = [x for x in str if len(x) == 1]
doStat(samostojne_crke)
##########

###########
print("###besede dolzine 2znaka###")
samostojne_crke = [x for x in str if len(x) == 2]
doStat(samostojne_crke)
###########


###########
print("###besede dolzine 3znakov###")
samostojne_crke = [x for x in str if len(x) == 3]
doStat(samostojne_crke)
###########

###########
print("###besede dolzine 4znakov###")
samostojne_crke = [x for x in str if len(x) == 4]
doStat(samostojne_crke)
###########


def getSplit(a):
    return [str_without_split[i:i+a]
            for i in range(0, len(str_without_split), 1) if ' ' not in str_without_split[i: i + a] and len(str_without_split[i: i + a]) == a]


###########
print("###dvojcki###")
dvojcki = getSplit(2)
doStat(dvojcki)
###########

###########
print("###trojcki###")

trojcki = getSplit(3)
doStat(trojcki)
###########

###########
print("###cet###")

cet = getSplit(4)
doStat(cet)
###########

print("###pet###")

pet = getSplit(5)
doStat(pet)
###########

###########
print("###samostojne crke###")
dvojcki = [str_without_split[i]
           for i in range(0, len(str_without_split))]
doStat(dvojcki)
###########

print(str_without_split)
