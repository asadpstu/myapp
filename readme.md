API Key
a888e4e4ee64b9010de1caea4c5d59dc

Stripe Publishable key
pk_test_wXXygoU9x9WcYag3k8qdNsOq

To build Android Apk

Step 1 : cd android
Step 2 : ./gradlew clean
Step 3: cd ..
Step 4: npm run build:android



App icon set : 
generate icon :  https://easyappicon.com
implementation : https://www.mridul.tech/blogs/how-to-change-react-native-app-icon-for-ios-and-android


To test stripe : 
stripe folder contains the backend code to generate clientsecret.

Stripe folder does not have any relation with the mobile app source code. 

Go to stripe folder
Github : https://github.com/asadpstu/stripe
Deployed on : https://render.com/
Step 1 : cd stripe
Step 2 : node server.js

Postman : 
http://localhost:4242/create-payment-intent [Post request]
{
    "currency": "usd",
    "amount": 500,
    "paymentMethodType" : ["card"]
}
Response : 
{
    "clientSecret": "pi_3NKI8YAKk6LSMxlE3n8dsN0y_secret_1AFdAmKBDJkXx7jWUWHX14zti",
    "nextAction": null
}

For emulator  test purpose , copy and paste [clientSecret] in MyCartScreen.js here 
  const clientSecret = await fetchPaymentIntentClientSecret();
`