import React from 'react'
import axios from 'axios'

const ShowData = ({ dbData }) => {

    let handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token")

            await axios.delete(
                `http://localhost:3000/api/expense/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("expense deleted ✅")

        } catch (error) {
            alert("error deleting expense ❌")
        }
    }

    return (
        <div className="mt-6 space-y-4">

            {dbData.length > 0 ? (
                dbData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold text-gray-800">{item.description}</p>
                            <p className="text-sm text-gray-500">₹ {item.money}</p>
                            <p className="text-xs text-blue-500">{item.category}</p>
                        </div>

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No data available</p>
            )}

        </div>
    )
}

export default ShowData