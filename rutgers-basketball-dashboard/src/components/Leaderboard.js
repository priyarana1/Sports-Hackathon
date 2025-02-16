import React from "react";

function Leaderboard() {
    return (
        <div>
        {/*This creates a leaderboard title*/}
        <h2> Leaderboard</h2>

        {/*This creates a table*/}
        <table border="1">
            {/*This creates a table header*/}
            <thead> 
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Points</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>John Doe</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>John Doe</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>John Doe</td>
                    <td>100</td>
                </tr>
                <tr>   
                    <td>5</td>
                    <td>John Doe</td>
                    <td>100</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Leaderboard;