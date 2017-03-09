You will need elasticsearch package.

Run command below to execute : 


node install elasticsearch --save
node index









Description
------------------------------------------------------------
Step 1 : Get the data from data.txt
Step 2: Read data.txt line by line, each read convert to json format
Step 3: Parse @timestamp to YYYY-MM-DD as elasticsearch index name.
Step 4: Keep the value in array, if size more than 1000, bulk insert into elasticsearch. Reset array size.
Step 5: If done, quit the loop, exit the process.