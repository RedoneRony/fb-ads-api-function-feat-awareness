const axios = require("axios")


async function createAd({
    access_token ,
    ad_account_id ,
    campaign_name ,
    campaign_objective ,
    adset_name ,
    adset_budget ,
    billing_event ,
    targeting ,
    end_time ,
    ad_name ,
    page_id ,
    creative_name ,
    creative_url ,
    creative_message  
}) {

    try{
            // create ad campign , get camping id  
        let campaign = await axios.post(`https://graph.facebook.com/v10.0/act_${ad_account_id}/campaigns`,{
            name : campaign_name,
            objective : campaign_objective ,
            status : 'PAUSED' ,
            special_ad_categories: [] ,
            access_token  ,
        })
        


        let campaign_id = campaign.data.id 
            
        // create ad-set from capign id 
        

        let adset = await axios.post(`https://graph.facebook.com/v10.0/act_${ad_account_id}/adsets`,{
                name : adset_name ,
                lifetime_budget : adset_budget ,
                // optimization_goal : adset_optimization_goal,
                billing_event : billing_event , // IMPRESSIONS pay when ads are shown to people 
                // bid_amount : bid_amount,
                bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
                targeting : targeting,
                campaign_id  ,
                end_time : end_time ,
                status : 'PAUSED' ,
                access_token ,
        
        })

        let adset_id = adset.data.id 

     

        //    create "creative" and ad 
        let ad = await axios.post(`https://graph.facebook.com/v10.0/act_${ad_account_id}/ads`,{
            name : ad_name,
            status : "PAUSED" ,
            adset_id ,
            access_token,
            creative : {
                name : creative_name ,
                object_story_spec : {
                        page_id : page_id,
                        link_data : {
                            link : creative_url,
                            message : creative_message 
                        }
                }
            },
        })

        let ad_id = ad.data.id 

        return {

            message : 'success , ad created ' ,
            data : {
                campaign_id ,
                adset_id ,
                ad_id ,
            }
        }

    }catch(e){
        return {
            message : 'ad not created' ,
            error : e.response.data.error 
        }
    }
        
}



let params = {
    access_token : 'EAAFIMci8mvABAANb55v4vNyrgj1ZAOfFZBcNVUXc95h5dr3GpfX2oT9ZAx3r3FClGVbWvqV9ZA9Ov1XOZANrrgZBOlDusFhZBcSECk41NRgyi3njLDgaavVLF6Tl7lQ8qj2XanSMjbVToYBcuQo8g0ZBZCS8lQSQqj4xBRwLZA6qYOAMSJIcO79726odt8PtZBGistqNMbLBQD0kgZDZD' ,
    ad_account_id : '760249887886995',
    campaign_name : 'demo-campaign',
    campaign_objective : 'BRAND_AWARENESS' ,
    adset_name : 'demo-adset',
    adset_budget : '100000',
    adset_optimization_goal : 'AD_RECALL_LIFT' ,
    billing_event : 'IMPRESSIONS',
    bid_amount : '2',
    end_time : '2021-04-15T22:41:30+0000' ,
    ad_name : 'demo-ad',
    page_id : '122056531619983',
    creative_name :'demo-creative',
    creative_url : "https://client-creatives.s3-ap-southeast-1.amazonaws.com/95218bf0-4d8d-4c70-afa1-bccc4f959625.png" ,
    creative_message : 'demo-message',
    targeting : {
        "geo_locations":{
            "custom_locations" : [
                {'latitude': 36, 'longitude': -121.0, 'radius': 20, 'distance_unit': 'kilometer'},
            ]
        }
    },
}

createAd(params).then( res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})

