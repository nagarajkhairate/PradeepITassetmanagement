export   const columns = [
    {
      title: 'Asset Past Due',
      description: 'Show alerts for assets that are past due.',
      value: 'column1',
    },
    {
      title: 'Email Alerts',
      description:
        'Turn on this option to email out an alert if any alert exists.',
      value: 'column2',
    },
  ]


  
    const columns1= [
      {
        "title": "Asset Past Due",
        "decription": "Show alerts for assets that are past due.",
        "isVisible": true,
        "linkedAssets": {
          "title": 'email',
          "decription": "Turn on this option to email out an alert if any alert exists.",
          "isVisible": true,
          "button": {
            "isVisible": true
          }
        }
      },
      {
        "title": "Contract Alerts",
        "decription": "Show alerts for expiring contracts.",
        "iVisible": true,
        "linkedAsset": {
          "fieldName": "Lead Time",
          "title": "email",
          "decription": "Turn on this option to email out an alert if any alert exists.",
          "isVisible": true,
          "button": {
            "isVisible": true
          }
        }
      },
      
    ]
  