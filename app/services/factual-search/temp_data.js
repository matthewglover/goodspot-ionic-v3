const tempData =
  [
    {
      "id": "9bc628cb-0d7e-4002-b12a-51c0b1ae8549",
      "placeType": "factual",
      "name": "Hop Scotch",
      "latLng": {
        "lat": 51.449504,
        "lng": -0.044246
      },
      "formattedAddress": "72 Honor Oak Park, London, SE23 1DY, Greater London",
      "tel": "020 8699 8998",
      "hours": "Mon 10:00 AM-3:00 PM; Tue-Wed 9:00 AM-6:00 PM; Thu-Fri 9:00 AM-11:59 PM; Sat 10:00 AM-11:59 PM; Sun 10:00 AM-4:00 PM",
      "isGoodspot": false
    },
    {
      "id": "a5b5f788-5e64-4be0-9086-df222b8d2a5a",
      "placeType": "factual",
      "name": "Golden Tiger",
      "latLng": {
        "lat": 51.449424,
        "lng": -0.043697
      },
      "formattedAddress": "54 Honor Oak Park, London, SE23 1DY, Greater London",
      "tel": "020 8314 4177",
      "hours": "Open Daily 4:00 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "0d6ee20d-9d22-4578-aded-9370c0a5163d",
      "placeType": "factual",
      "name": "Babur Brasserie",
      "latLng": {
        "lat": 51.447473,
        "lng": -0.042021
      },
      "formattedAddress": "119 Brockley Rise, London, SE23 1JP, Greater London",
      "tel": "020 8291 2400",
      "hours": "Mon 12:00 AM-1:30 AM, 12:00 PM-2:30 PM, 6:00 PM-11:30 PM; Tue-Sat 12:00 PM-2:30 PM, 6:00 PM-11:30 PM; Sun 6:00 PM-11:59 PM",
      "isGoodspot": false
    },
    {
      "id": "9b4c6766-8e2d-4ce6-b38f-5c702e6fc4cb",
      "placeType": "factual",
      "name": "Stone Bar",
      "latLng": {
        "lat": 51.449468,
        "lng": -0.04371
      },
      "formattedAddress": "68-70 Honor Oak Park, London, SE23 1DY, Greater London",
      "tel": "020 8291 1447",
      "isGoodspot": false
    },
    {
      "id": "bc0864b6-054e-404e-99bf-e3fc573b13fd",
      "placeType": "factual",
      "name": "Le Querce",
      "latLng": {
        "lat": 51.448003,
        "lng": -0.040951
      },
      "formattedAddress": "68 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 3761",
      "hours": "Tue-Sat 6:00 AM-10:30 PM; Sun 12:00 PM-8:30 PM",
      "isGoodspot": false
    },
    {
      "id": "df6ce00a-837e-4a09-82ce-5d7aae27b9bb",
      "placeType": "factual",
      "name": "Hills and Parkes Delicatessen",
      "latLng": {
        "lat": 51.44945,
        "lng": -0.04418
      },
      "formattedAddress": "49 Honor Oak Park, London, SE23 1EA, Greater London",
      "tel": "020 8699 1996",
      "isGoodspot": false
    },
    {
      "id": "c36bca29-3cf5-4545-8266-417428c11b37",
      "placeType": "factual",
      "name": "Honor Oak Gallery",
      "latLng": {
        "lat": 51.449367,
        "lng": -0.043689
      },
      "formattedAddress": "52 Honor Oak Park, London, SE23 1DY, Greater London",
      "tel": "020 8291 6094",
      "hours": "Mon-Tue 7:30 AM-6:30 PM; Wed 7:30 AM-1:00 PM; Thu-Fri 7:30 AM-6:30 PM; Sat 8:30 AM-6:30 PM",
      "isGoodspot": false
    },
    {
      "id": "361c62d5-1183-41f7-beb3-6e1bf20cbb46",
      "placeType": "factual",
      "name": "Express Pizza Co",
      "latLng": {
        "lat": 51.449364,
        "lng": -0.043451
      },
      "formattedAddress": "46 Honor Oak Park, London, SE23 1DY, Greater London",
      "tel": "020 8291 6000",
      "hours": "Mon-Fri 12:00 PM-11:59 PM; Sat-Sun 12:00 AM-1:00 AM, 12:00 PM-11:59 PM",
      "isGoodspot": false
    },
    {
      "id": "a9391254-e25a-4392-8847-645a17ec07d1",
      "placeType": "factual",
      "name": "Tai Wu",
      "latLng": {
        "lat": 51.44818,
        "lng": -0.040762
      },
      "formattedAddress": "82 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 8790",
      "hours": "Mon-Sat 5:30 PM-11:30 PM",
      "isGoodspot": false
    },
    {
      "id": "3a01ebce-0039-464f-8065-89d5dd8d16b9",
      "placeType": "factual",
      "name": "Rice and Spice",
      "latLng": {
        "lat": 51.448179,
        "lng": -0.040849
      },
      "formattedAddress": "78 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8314 0093",
      "hours": "Open Daily 5:30 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "96e938b4-9d1f-46ba-bca2-4b4bae395ed9",
      "placeType": "factual",
      "name": "Super Pizza",
      "latLng": {
        "lat": 51.448458,
        "lng": -0.040423
      },
      "formattedAddress": "100 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8314 5599",
      "hours": "Mon-Sat 5:00 PM-11:59 PM",
      "isGoodspot": false
    },
    {
      "id": "b0f5516e-c92b-44b0-8f0d-857a979576a6",
      "placeType": "factual",
      "name": "Mediterranean Deli",
      "latLng": {
        "lat": 51.449485,
        "lng": -0.044065
      },
      "formattedAddress": "72 Honor Oak Pk, London, SE23 1DY, Greater London",
      "tel": "020 8699 3113",
      "isGoodspot": false
    },
    {
      "id": "93af675e-6e40-4cf0-9283-85c72a4461ca",
      "placeType": "factual",
      "name": "Andreani Photo Workshops",
      "latLng": {
        "lat": 51.450904,
        "lng": -0.041142
      },
      "formattedAddress": "13 Maclean Rd, London, SE23 1PB, Greater London",
      "tel": "07941 040143",
      "hours": "Mon-Sat 9:00 AM-6:00 PM",
      "isGoodspot": false
    },
    {
      "id": "c2906df4-dd34-487a-849c-e84d1883c6d5",
      "placeType": "factual",
      "name": "Nandi Nandi",
      "latLng": {
        "lat": 51.448645,
        "lng": -0.040847
      },
      "formattedAddress": "3 Honor Oak Park, London, SE23 1DX, Greater London",
      "tel": "020 8291 3808",
      "hours": "Mon 9:00 AM-5:00 PM",
      "isGoodspot": false
    },
    {
      "id": "707ed001-5327-4278-9588-8f43b586e0d5",
      "placeType": "factual",
      "name": "William Hill",
      "latLng": {
        "lat": 51.447916,
        "lng": -0.041373
      },
      "formattedAddress": "137-139 Brockley Rise, London, SE23 1NJ, Greater London",
      "tel": "0870 518 1715",
      "isGoodspot": false
    },
    {
      "id": "1940844f-a2be-4cc6-838b-72499f117fdf",
      "placeType": "factual",
      "name": "The Oak Cafe",
      "latLng": {
        "lat": 51.449357,
        "lng": -0.043758
      },
      "formattedAddress": "Honor Oak Park, Greater London",
      "isGoodspot": false
    },
    {
      "id": "b4707ac9-90a6-4999-87f4-18a84c58fb22",
      "placeType": "factual",
      "name": "Donde Tapas Restaurant",
      "latLng": {
        "lat": 51.449355,
        "lng": -0.043696
      },
      "formattedAddress": "37-39 Honor Oak Park, London, SE23 1DZ, Greater London",
      "tel": "020 8291 2822",
      "isGoodspot": false
    },
    {
      "id": "8822a998-c4d4-4535-b69a-015869bab316",
      "placeType": "factual",
      "name": "Honor Oak Tandoori",
      "latLng": {
        "lat": 51.449341,
        "lng": -0.04445
      },
      "formattedAddress": "57-59 Honor Oak Park, London, SE23 1EA, Greater London",
      "tel": "020 8699 2255",
      "isGoodspot": false
    },
    {
      "id": "0d1edc71-4d3c-4899-b81f-3b2bbfdfddd6",
      "placeType": "factual",
      "name": "McLarens Cafe Bar and Grill",
      "latLng": {
        "lat": 51.448573,
        "lng": -0.040732
      },
      "formattedAddress": "1 Honor Oak Park, London, SE23 1DX, Greater London",
      "tel": "020 8314 4089",
      "isGoodspot": false
    },
    {
      "id": "27f8af4c-3ea2-4f1b-ba5c-0b22b43c33d2",
      "placeType": "factual",
      "name": "Fs2",
      "latLng": {
        "lat": 51.448297,
        "lng": -0.040961
      },
      "formattedAddress": "133 Brockley Rise, London, SE23 1NJ, Greater London",
      "tel": "020 8291 0130",
      "hours": "Mon 12:00 PM-11:00 PM; Tue 12:00 PM-10:00 PM; Wed-Sat 12:00 PM-11:00 PM; Sun 3:00 PM-10:00 PM",
      "isGoodspot": false
    },
    {
      "id": "75ae9576-2200-45e7-9b8e-ec76b0a3d52d",
      "placeType": "factual",
      "name": "Forest Hill and District Classic Car Club",
      "latLng": {
        "lat": 51.44801,
        "lng": -0.049606
      },
      "formattedAddress": "51 Boveney Rd, London, SE23 3NL, Greater London",
      "tel": "020 8291 3095",
      "isGoodspot": false
    },
    {
      "id": "3f3c27b7-eef5-4743-a1a2-f024e2d97f88",
      "placeType": "factual",
      "name": "Chandos",
      "latLng": {
        "lat": 51.447952,
        "lng": -0.040911
      },
      "formattedAddress": "56 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8314 5920",
      "hours": "Mon-Sat 11:00 AM-11:00 PM; Sun 12:00 PM-10:30 PM",
      "isGoodspot": false
    },
    {
      "id": "b451188c-b887-490f-8ee8-3cd60beff3c5",
      "placeType": "factual",
      "name": "Tapastry",
      "latLng": {
        "lat": 51.44915,
        "lng": -0.043525
      },
      "formattedAddress": "Honor Oak Park 39, London, SE23 1DZ, Greater London",
      "tel": "020 8291 2822",
      "isGoodspot": false
    },
    {
      "id": "28dd6acf-5485-40c5-8744-f99fabe831c9",
      "placeType": "factual",
      "name": "Wilson Fish and Chip Shop",
      "latLng": {
        "lat": 51.448312,
        "lng": -0.040569
      },
      "formattedAddress": "88 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 5126",
      "hours": "Mon-Sat 11:30 AM-10:30 PM",
      "isGoodspot": false
    },
    {
      "id": "7fbae740-6d0a-462c-8160-153ae3e5ab4f",
      "placeType": "factual",
      "name": "Hap Hing",
      "latLng": {
        "lat": 51.44939,
        "lng": -0.043655
      },
      "formattedAddress": "54 Honor Oak Pk, London, SE23 1DY, Greater London",
      "tel": "020 8314 4177",
      "isGoodspot": false
    },
    {
      "id": "e7424d9e-c945-4566-9790-a98cf7acffcb",
      "placeType": "factual",
      "name": "Tonys Cafe",
      "latLng": {
        "lat": 51.44817,
        "lng": -0.04106
      },
      "formattedAddress": "131 Brockley Rise, London, SE23 1NJ, Greater London",
      "tel": "020 3538 8755",
      "hours": "Mon-Fri 6:30 AM-5:00 PM; Sat-Sun 7:00 AM-4:00 PM",
      "isGoodspot": false
    },
    {
      "id": "6b6854f1-5523-4c8b-b3e4-0ca31d619e29",
      "placeType": "factual",
      "name": "The Big Plate Cafe",
      "latLng": {
        "lat": 51.448155,
        "lng": -0.040654
      },
      "formattedAddress": "64 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 1090",
      "hours": "Mon-Sat 7:00 AM-4:00 PM; Sun 8:00 AM-4:00 PM",
      "isGoodspot": false
    },
    {
      "id": "dc6b4c38-ff3e-4c48-926d-27b5db8511a0",
      "placeType": "factual",
      "name": "Sun Do",
      "latLng": {
        "lat": 51.44832,
        "lng": -0.0405
      },
      "formattedAddress": "92 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 7888",
      "isGoodspot": false
    },
    {
      "id": "27a9585c-8e66-4bf4-b9a7-23a0216938fb",
      "placeType": "factual",
      "name": "Morleys Fried Chicken",
      "latLng": {
        "lat": 51.44753,
        "lng": -0.041997
      },
      "formattedAddress": "123 Brockley Rise, London, SE23 1JP, Greater London",
      "tel": "020 8291 5955",
      "isGoodspot": false
    },
    {
      "id": "3cb3c04a-6735-44e4-bbe7-7e2acc8aae5b",
      "placeType": "factual",
      "name": "The Brockley Jack Theatre",
      "latLng": {
        "lat": 51.453333,
        "lng": -0.038484
      },
      "formattedAddress": "410 Brockley Rd, London, SE4 2DH, Greater London",
      "tel": "020 8699 3966",
      "hours": "Open Daily 11:00 AM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "b9473474-fb5f-4179-99d8-bc9e91f0f563",
      "placeType": "factual",
      "name": "Royal Tiffin, Forest Hill",
      "latLng": {
        "lat": 51.448186,
        "lng": -0.040861
      },
      "formattedAddress": "78 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8314 1394",
      "isGoodspot": false
    },
    {
      "id": "18e3b63b-64f4-4733-aecf-bf665db33ff0",
      "placeType": "factual",
      "name": "Casa Tequila",
      "latLng": {
        "lat": 51.448048,
        "lng": -0.040932
      },
      "formattedAddress": "66 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8690 7323",
      "isGoodspot": false
    },
    {
      "id": "d16d3265-fcea-4c22-b6db-95a7834c1332",
      "placeType": "factual",
      "name": "Yam Hill",
      "latLng": {
        "lat": 51.449097,
        "lng": -0.039411
      },
      "formattedAddress": "108 Brockley Rise, London, SE23 1NH, Greater London",
      "tel": "020 8314 1154",
      "isGoodspot": false
    },
    {
      "id": "41b88fb0-3b94-4eb2-a416-c355057f6e36",
      "placeType": "factual",
      "name": "Jam Circus",
      "latLng": {
        "lat": 51.455958,
        "lng": -0.036532
      },
      "formattedAddress": "330-332 Brockley Rd, London, SE4 2BT, Greater London",
      "tel": "020 8692 3320",
      "hours": "Mon-Thu 12:00 PM-11:59 PM; Fri 11:00 AM-11:59 PM; Sat 12:00 AM-1:00 AM, 11:00 AM-11:59 PM; Sun 12:00 AM-1:00 AM, 12:00 PM-11:59 PM",
      "isGoodspot": false
    },
    {
      "id": "bb76f40b-28f3-4492-b526-a6e72790ebae",
      "placeType": "factual",
      "name": "General Napier",
      "latLng": {
        "lat": 51.445646,
        "lng": -0.044688
      },
      "formattedAddress": "73 Bovill Rd, London, SE23 1EX, Greater London",
      "tel": "020 8699 6970",
      "isGoodspot": false
    },
    {
      "id": "b7624acb-646b-4389-8043-d42270dd7ac6",
      "placeType": "factual",
      "name": "Mr Lawrence Wine Merchant",
      "latLng": {
        "lat": 51.454635,
        "lng": -0.03724
      },
      "formattedAddress": "391 Brockley Rd, London, SE4 2PH, Greater London",
      "tel": "020 8692 1550",
      "hours": "Open Daily 12:00 PM-9:00 PM",
      "isGoodspot": false
    },
    {
      "id": "9f263cd6-ffc8-47d6-b7a9-03af756b709a",
      "placeType": "factual",
      "name": "Omrith",
      "latLng": {
        "lat": 51.452005,
        "lng": -0.059925
      },
      "formattedAddress": "104B Forest Hill Rd, London, SE22 0RS, Greater London",
      "tel": "020 8299 3962",
      "hours": "Mon-Thu 5:00 PM-11:00 PM; Fri-Sat 5:00 PM-11:59 PM; Sun 5:00 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "463407da-4a4c-45eb-96fd-876a6a0e0ad4",
      "placeType": "factual",
      "name": "Brockley Fish Bar",
      "latLng": {
        "lat": 51.454627,
        "lng": -0.037287
      },
      "formattedAddress": "393 Brockley Rd, London, SE4 2PH, Greater London",
      "tel": "020 8692 6664",
      "hours": "Mon-Sat 11:00 AM-11:00 PM; Sun 2:00 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "c35ca56c-881e-4925-8db5-22171ad15e43",
      "placeType": "factual",
      "name": "The Full Kebab House",
      "latLng": {
        "lat": 51.448335,
        "lng": -0.040967
      },
      "formattedAddress": "133 Brockley Rise, London, SE23 1NJ, Greater London",
      "tel": "020 8291 0130",
      "isGoodspot": false
    },
    {
      "id": "1aca1019-3ad8-4cb6-9a53-0f703c4d9871",
      "placeType": "factual",
      "name": "The Gurkha's Flavour",
      "latLng": {
        "lat": 51.442409,
        "lng": -0.03491
      },
      "formattedAddress": "297A Stanstead Rd, London, SE23 1JB, Greater London",
      "tel": "020 8314 0614",
      "hours": "Mon-Thu 5:00 PM-11:00 PM; Fri-Sat 5:00 PM-11:30 PM; Sun 5:00 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "4e0c97d2-ae43-48f8-be0e-5a484c8ba537",
      "placeType": "factual",
      "name": "EXP Chinese",
      "latLng": {
        "lat": 51.45417,
        "lng": -0.037799
      },
      "formattedAddress": "390 Brockley Rd, London, SE4 2BY, Greater London",
      "tel": "020 8692 2221",
      "hours": "Open Daily 4:30 PM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "1e705590-3bd1-44ad-84a8-49c203dbefd3",
      "placeType": "factual",
      "name": "The Ivy House",
      "latLng": {
        "lat": 51.458408,
        "lng": -0.052541
      },
      "formattedAddress": "40 Stuart Rd, London, SE15 3BE, Greater London",
      "tel": "020 7732 0222",
      "isGoodspot": false
    },
    {
      "id": "4512deb3-b71c-4195-9139-da7287860d02",
      "placeType": "factual",
      "name": "Babur",
      "latLng": {
        "lat": 51.452877,
        "lng": -0.03833
      },
      "formattedAddress": "443 Brockley Rd, London, SE4 2PJ, Greater London",
      "tel": "020 8291 4314",
      "hours": "Open Daily 5:00 PM-11:30 PM",
      "isGoodspot": false
    },
    {
      "id": "b5482edf-0928-4453-ae24-b0a4f64982f7",
      "placeType": "factual",
      "name": "Mugal Tandoori",
      "latLng": {
        "lat": 51.448162,
        "lng": -0.040773
      },
      "formattedAddress": "78 Brockley Rise, London, SE23 1LN, Greater London",
      "tel": "020 8314 1394",
      "isGoodspot": false
    },
    {
      "id": "b2a7fad0-bb1a-49e6-a8f8-44843b0111d7",
      "placeType": "factual",
      "name": "The Railway Telegraph",
      "latLng": {
        "lat": 51.442178,
        "lng": -0.048214
      },
      "formattedAddress": "112 Stanstead Rd, London, SE23 1BS, Greater London",
      "tel": "020 8699 6644",
      "hours": "Mon-Thu 11:00 AM-11:00 PM; Fri 11:00 AM-11:59 PM; Sat 12:00 AM-1:30 AM, 11:00 AM-11:59 PM; Sun 12:00 AM-1:30 AM, 11:00 AM-11:00 PM",
      "isGoodspot": false
    },
    {
      "id": "f0459b8e-fdf3-46cf-b19b-7f0a569bdc71",
      "placeType": "factual",
      "name": "Jerk Garden",
      "latLng": {
        "lat": 51.454081,
        "lng": -0.037893
      },
      "formattedAddress": "394 Brockley Rd, London, SE4 2BY, Greater London",
      "tel": "020 8320 2322",
      "hours": "Open Daily 11:00 AM-10:00 PM",
      "isGoodspot": false
    },
    {
      "id": "90f3f4a6-c22a-4b46-98c3-fdf17a3809a6",
      "placeType": "factual",
      "name": "Spring Way",
      "latLng": {
        "lat": 51.453406,
        "lng": -0.038197
      },
      "formattedAddress": "433 Brockley Rd, London, SE4 2PJ, Greater London",
      "tel": "020 8699 1957",
      "hours": "Open Daily 3:00 PM-11:30 PM",
      "isGoodspot": false
    },
    {
      "id": "76355360-b925-4524-bc5a-87dc03953edc",
      "placeType": "factual",
      "name": "Forest Hill Tavern",
      "latLng": {
        "lat": 51.451995,
        "lng": -0.059962
      },
      "formattedAddress": "108 Forest Hill Rd, London, SE22 0RS, Greater London",
      "tel": "020 8693 0338",
      "hours": "Mon-Sat 7:00 AM-11:00 PM; Sun 8:00 AM-10:30 PM",
      "isGoodspot": false
    },
    {
      "id": "19aa2051-4217-4e2e-8b52-c7d25a8ff5fe",
      "placeType": "factual",
      "name": "Dewaniam Tandoori Restaurant",
      "latLng": {
        "lat": 51.442335,
        "lng": -0.046881
      },
      "formattedAddress": "133-135 Stanstead Rd, London, SE23 1HH, Greater London",
      "tel": "020 8291 4778",
      "hours": "Open Daily 12:00 PM-2:30 PM, 6:00 PM-11:59 PM",
      "isGoodspot": false
    },
    {
      "id": "9ffb9ade-4baf-4f69-b1e8-99b0d054ce45",
      "placeType": "factual",
      "name": "Royal Tandoori",
      "latLng": {
        "lat": 51.454686,
        "lng": -0.037148
      },
      "formattedAddress": "387 Brockley Rd, London, SE4 2PH, Greater London",
      "tel": "020 8692 0700",
      "hours": "Open Daily 5:30 PM-11:30 PM",
      "isGoodspot": false
    }
  ];

export default tempData;
