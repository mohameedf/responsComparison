# Respons Comparison Package Npm 📦

![alt text](https://i.ibb.co/Tc6ZyxL/Animation.gif)


## To install

```
npm i respons_compression
```
---
## How to use 

    in the server side
    
    ```
    const Responsecompression = require("./responsCompression");
    
    const e = Responsecompression.encrypt(YOUR_OBJECT); // compressed as a array
    
    return res.json(encrypted: e);
    ```
    
    in client side
    
    ```
    const Responsecompression = require("./responsCompression");
    
    const original_object= Responsecompression.decrypt(YOUR_OBJECT); // return to original object 
    ```
----
