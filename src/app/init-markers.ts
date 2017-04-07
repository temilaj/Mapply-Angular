export class Init {
    load() {
        if (localStorage.getItem('markers') == null || localStorage.getItem('markers') == undefined) {
            console.log('No markers found');

            let markers = [
                {
                    name: 'Company A',
                    lat: 6.5152,
                    long: 3.3792,
                    draggable: true
                },
                {
                    name: 'Company B',
                    lat: 6.5112,
                    long: 3.1792,
                    draggable: true
                },
                {
                    name: 'Company C',
                    lat: 6.5352,
                    long: 3.6792,
                    draggable: true
                }
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        }
        else{
            console.log('Loading Markers')
        }
    }
}