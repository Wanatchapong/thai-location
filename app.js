const app = require('express')();
const fs = require('fs');
const port = process.env.port || 8080;

app.get('/download', (req, res) => {
    let provinces = JSON.parse(fs.readFileSync('./data/provinces.json', 'utf8')).data;
    let districts = JSON.parse(fs.readFileSync('./data/districts.json', 'utf8')).data;
    let subdistricts = JSON.parse(fs.readFileSync('./data/subdistricts.json', 'utf8')).data;
    let zipcodes = JSON.parse(fs.readFileSync('./data/zipcodes.json', 'utf8')).data;
    let zipcodeLatLng = JSON.parse(fs.readFileSync('./data/zipcodes_lat_lng.json', 'utf8')).data;

    let results = [];
    for (let p of provinces) {
        let province = {
            code: p.PROVINCE_CODE,
            name: p.PROVINCE_NAME,
            districts: []
        };

        for (let d of districts) {

            if (d.PROVINCE_ID === p.PROVINCE_ID) {
                let district = {
                    code: d.DISTRICT_CODE,
                    name: d.DISTRICT_NAME,
                    sub_districts: []
                };

                for (let s of subdistricts) {
                    
                    if (s.DISTRICT_ID === d.DISTRICT_ID) {
                        let subdistrict = {
                            code: s.SUB_DISTRICT_CODE,
                            name: s.SUB_DISTRICT_NAME,
                            zipcodes: []
                        };

                        for (let z of zipcodes) {

                            if (z.SUB_DISTRICT_ID == s.SUB_DISTRICT_ID) {
                                let zipcode = {
                                    zipcode: z.ZIPCODE
                                };

                                for (let latlng of zipcodeLatLng) {

                                    if (latlng.zip === z.ZIPCODE) {
                                        zipcode.lat = latlng.lat;
                                        zipcode.lng = latlng.lng;
                                    }

                                }

                                subdistrict.zipcodes.push(zipcode);

                            } // end zipcodes IF

                        } // end zipcodes FOR

                        district.sub_districts.push(subdistrict);
                        
                    } // end subdistricts IF

                } // end subdistricts FOR

                province.districts.push(district);

            } // end districts IF

        } // end districts FOR

        results.push(province);
    }

    const data = JSON.stringify({ provinces: results });

    res.setHeader('Content-disposition', 'attachment; filename=thai_address.json');
    res.setHeader('Content-type', 'application/json');
    res.write(data, (err) => {
        res.end();
    });
});

// fs.writeFile('./output/thailand_address.json', content, 'utf8', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});