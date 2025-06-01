import React from 'react';
import './social.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Social() {
    const table = [
        { column1: "Տարեթիվ", column2: "Facebook", column3: "Instagram", column4: "Ծանոթներ" },
        { column1: "2022", column2: "65%", column3: "24%", column4: "11%" },
        { column1: "2023", column2: "72%", column3: "28%", column4: "10%" },
        { column1: "2024", column2: "67%", column3: "18%", column4: "15%" },
        { column1: "2025", column2: "75%", column3: "15%", column4: "10%" }
    ];

    const years = table.slice(1).map(row => row.column1);
    const facebook = table.slice(1).map(row => parseInt(row.column2));
    const instagram = table.slice(1).map(row => parseInt(row.column3));
    const friends = table.slice(1).map(row => parseInt(row.column4));

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Facebook',
                data: facebook,
                borderColor: '#1877f2',
                backgroundColor: 'rgba(24, 119, 242, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Instagram',
                data: instagram,
                borderColor: '#e1306c',
                backgroundColor: 'rgba(225, 48, 108, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Ծանոթներ',
                data: friends,
                borderColor: '#f9a825',
                backgroundColor: 'rgba(249, 168, 37, 0.2)',
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: {
                display: true,
                text: 'Տարեկան իրազեկման աղբյուրների տոկոսները'
            }
        }
    };

    return (
        <div className='social'>
            <h2>Աղյուսակում ներկայացված է վերջին չորս տարիների հարցումների արդյունքները, տոկոսային արտահայտությամբ.</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>{table[0].column1}</th>
                            <th>{table[0].column2}</th>
                            <th>{table[0].column3}</th>
                            <th>{table[0].column4}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.slice(1).map((row, index) => (
                            <tr key={index}>
                                <td>{row.column1}</td>
                                <td>{row.column2}</td>
                                <td>{row.column3}</td>
                                <td>{row.column4}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-container">
                <Line data={data} options={options} />
            </div>

            <p>
                Տեղեկատվական իրազեկման աշխատանքները կատարում է «ԱՌԴԱ» ԲՀ մասնագիտական կրթական կենտրոնի ՎԵԲ ծրագրավորման դասախոս Լիաննա Գալստյանը՝
                <strong> «Մասնագիտական կրթություն՝ արժանապատիվ աշխատանք»</strong> կարգախոսով։ Հարցումների արդյունքները վկայում են,
                որ դիմորդների գերակշիռ մասը կենտրոնի մասին տեղեկանում է Facebook էջից։
            </p>
        </div>
    );
}
