CREATER :

<!-- GỌI APIS VỚI TYPE KHÁC NHAU  -->

-- LẦN 1
handelGetCodeByType = async () => {
let coppyState = { ...this.state }

         let arrBook = ['world', 'school', 'poetry', 'character']
         let arrBooks = []
         for (let i = 0; i < arrBook.length; i++) {
             console.log(arrBook[i]);
             arrBooks[i] = await createrService.handelGetCodeByType(arrBook[i]);
             coppyState[arrBook[i]] = arrBooks[i].data.data
         }
         this.setState({ ...coppyState })
     }

-- LẦN 2

handelGetCodeByTypes = async () => {
try {
let arrBook = ['world', 'school', 'poetry', 'character']
const promises = arrBook.map(async (type) => {
const response = await createrService.handelGetCodeByType(type);
return { type, data: response.data.data };
});
const results = await Promise.all(promises);

            const updatedState = {};

            for (const result of results) {
                updatedState[result.type] = result.data;
            }

            this.setState({ ...updatedState });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

<!-- FUNC ADD BOOK CHECK NOT CHAGE PAGE -->
    --SET "" WHEN NOT CHAGE PAGE 

        let coppyState = this.state
        let StateNull = ['name', 'content', 'categoryID', 'bookWorld', 'bookChar', 'bookSchool', 'bookPoetry']
        for (let i = 0; i < StateNull.length; i++) {
            coppyState[StateNull[i]] = '';
        }

        this.setState({ ...coppyState })
        this.setState({ checkBox: !this.state.checkBox })
