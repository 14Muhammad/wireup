SET host=localhost:27017
SET dbNameToDump=wireupdb
SET backupsFolder=C:\database

mongodump.exe --host %host% --db %dbNameToDump% --out %backupsFolder%

:: SET date="%date:~10,4%-%date:~4,2%-%date:~7,2%.%time:~0,2%-%time:~3,2%"
:: cd %backupsFolder%
:: md %date%

:: xcopy /s/z "%backupsFolder%/%dbNameToDump%" "%backupsFolder%/%date%"

:: rmdir /s/q "%backupsFolder%/%dbNameToDump%"

:: PAUSE 