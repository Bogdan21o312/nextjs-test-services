import styles from './page.module.css'
import Image from "next/image";
import axios from "axios";

async function getData() {
    const API_URL = process.env.API_URL;

    try {
        const response = await axios.get(API_URL!, { params: { next: { revalidate: 10 } } });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export default async function Home() {
    const data = await getData()
    return (
        <main className={styles.main}>
            {data.data.map(item =>
                <div key={item.id}>
                    <div>
                        <div>
                            {item.attributes.name}
                        </div>
                    </div>
                    <Image src={`http://localhost:1337${item.attributes.image.data.attributes.formats.large.url}`} width={100} height={100} alt=""/>
                </div>
            )}
        </main>
    )
}
