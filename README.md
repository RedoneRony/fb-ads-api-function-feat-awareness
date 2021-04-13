# creating ad with facebook ad-api

I have created a function to create ad with facebook ad-api for 'Brand Awareness Campaign'
## install dependencies 
> goto the project root and run `npm install `

## run the project 
- fill the params object will correct values in index.js file 
- run `node index.js`

the function recives a object parameter with necessary attributes and they are 
||
|--|
|access_token| 
ad_account_id|
campaign_name| 
campaign_objective| 
adset_name|
adset_budget| 
billing_event| 
targeting| 
end_time| 
ad_name| 
page_id| 
creative_name| 
creative_url |
creative_message|

if the function execution is successfull it will return an object like 

```
{
  message: 'success , ad created ',
  data: {
    campaign_id: '23847024874890529',
    adset_id: '23847024874970529',
    ad_id: '23847024876070529'
  }
}

```

in case any exception occures it will return an object with a message and an error object 
```
{
    message : 'ad not created' ,
    error : {
        ...
    }
}
```
