SET host=localhost:27017
SET dbNameToRestore=wireupdb
SET restoreFolder=C:\database\wireupdb

mongorestore.exe --host %host% --db %dbNameToRestore% --dir %restoreFolder%

:: PAUSE