#  Notes App API Spec
  
  
##  Criterion 1
  
The API can store notes added via the web application
  
1. **END-POINT**
    - /notes
2. **METHOD**
    - ***POST***
3. **DATA**
    ``` 
    {
  
        id: string,
        title: string,
        createdAt: string,
        updateAt: string,
        tags: array of string,
        body: string,
  
    },    
  
    ```
  
  
  
###  Client request Body
  
  
``` 
{
    "title": "Judul Catatan",
    "tags": "["Tag 1", "Tag 2"]",
    "body": "Konten catatan"
}
```
  
###  Server response Body
  
  
- 201
  
``` 
{
    "status": "success",
    "message": "Catatan berhasil ditambahkan",
    "data": {
        "noteId": "V09YExygSUYogwWJ"
        }
}
```
- 500
  
```
{
    "status": "error",
    "message": "Catatan gagal untuk ditambahkan"
}
```
  
##  Criterion 2
  
The web server can display notes. The web server must send all or specifically the stored data notes
  
1. **END-POINT**
    - /notes
    - /notes/{id}
2. **METHOD**
    - ***GET***
3. **DATA**
    ``` 
    {
  
        id: string,
        title: string,
        createdAt: string,
        updateAt: string,
        tags: array of string,
        body: string,
  
    },    
  
    ```
  
###  Server Response Body
  
  
- Filled/With Data in Array (200)
  
```
  
    {
      "status": "success",
      "data": {
        "notes": [
          {
            "id":"notes-V1StGXR8_Z5jdHi6B-myT",
            "title":"Catatan 1",
            "createdAt":"2020-12-23T23:00:09.686Z",
            "updatedAt":"2020-12-23T23:00:09.686Z",
            "tags":[
              "Tag 1",
              "Tag 2"
            ],
            "body":"Isi dari catatan 1"
          },
          {
            "id":"notes-V1StGXR8_98apmLk3mm1",
            "title":"Catatan 2",
            "createdAt":"2020-12-23T23:00:09.686Z",
            "updatedAt":"2020-12-23T23:00:09.686Z",
            "tags":[
              "Tag 1",
              "Tag 2"
            ],
            "body":"Isi dari catatan 2"
          }
        ]
      }
    }
  
```
  
- With No Data in Array (200)
  
```
  
    {
      "status": "success",
      "data": {
        "notes": []
      }
    }
  
```
- No ID Found (404)
```
  
    {
      "status": "fail",
      "message": "Catatan tidak ditemukan"
    }
  
```
  
#  Criterion 3
  
The web server must be able to modify records. Changes in question can be in the form of title, content, or note tags. When the client requests a record change, it will make a request to the path '/ notes / {id}', use the 'PUT' method, and bring in JSON data in the request body which is the most recent record data.
  
1. **END-POINT**
    - /notes/{id}
2. **METHOD**
    - ***PUT***
3. **DATA**
    ``` 
    {
  
        id: string,
        title: string,
        createdAt: string,
        updateAt: string,
        tags: array of string,
        body: string,
  
    },    
  
    ```
  
###  Client Response Body (with New Data)
  
```
  
    {
      "title":"Judul Catatan Revisi",
      "tags":[
        "Tag 1",
        "Tag 2"
      ],
      "body":"Konten catatan"
    }
  
```
  
###  Server Response Body
  
  
- If the data change is successful (200)
  
```
  
    {
      "status": "success",
      "message": "Catatan berhasil diperbaharui"
    }
  
```
  
- if ID not FOund (404)
```
  
    {
      "status": "fail",
      "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
    }
  
```
  
#  Criterion 4
  
The web server must be able to delete records. To delete a note, the client will make a request on the path ‘/ notes / {id}’ with the ‘DELETE’ method.
  
1. **END-POINT**
    - /notes/{id}
2. **METHOD**
    - ***DELETE***
3. **DATA**
    ``` 
    {
  
        id: string,
        title: string,
        createdAt: string,
        updateAt: string,
        tags: array of string,
        body: string,
  
    },    
  
###  Server Response Body
  
- If request is successful
```
  
    {
      "status": "success",
      "message": "Catatan berhasil dihapus"
    }
  
```
  
- If ID Not Found
```
  
    {
      "status": "fail",
      "message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
    }
  
``` 
  