import axios from "axios";

//users
export const addUser = async (datas, signup) => {
    const res = await axios.post(`http://localhost:3001/user/${signup ? "login" : "signup"}`, {
        Name: signup ? "" : datas.name,
        Email: datas.email,
        Password: datas.password
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res);
    const resData = await res.data
    return resData;
}

export const getUsers = async () => {
    const res = await axios.get('http://localhost:3001/user/get')
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const getUserById = async (id) => {

    const res = await axios.get(`http://localhost:3001/user/getByID/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }

    const data = await res.data;
    return data;
};

//admins
export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminID");

    const res = await axios.get(`http://localhost:3001/admin/getByID/${adminId}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }

    console.log(res.data);
    const data = await res.data;
    return data;
};

export const addAdmin = async (datas, signin) => {
    const res = await axios.post("http://localhost:3001/admin/login", {
        Email: datas.email,
        Password: datas.password
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getUsersCartID = async (id) => {
    const res = await axios.get(`http://localhost:3001/admin/getUser/${id}`)
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

//books
export const addBooks = async (datas) => {
    const res = await axios.post('http://localhost:3001/book/addBook', {
        BookNo: datas.BookNo,
        description: datas.description,
        BookName: datas.BookName,
        BookType: datas.BookType,
        Author: datas.Author,
        pages: datas.pages,
        Price: datas.Price,
        yearPublished: datas.yearPublished,
        rating: datas.rating,
        image: datas.image,
        Offer: datas.Offer,
        Discount: datas.discount,
        admin: localStorage.getItem("adminID"),
    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }
    )
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const getBooks = async (datas) => {
    const res = await axios.get('http://localhost:3001/book/get')
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const getBookDetails = async (id) => {
    const res = await axios.get(`http://localhost:3001/book/getByID/${id}`).catch((e) => console.log(e));
    if (res.status !== 200) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data;
    return resData;
}

export const updateBook = async (id, datas) => {
    const res = await axios.put(`http://localhost:3001/book/updateByID/${id}`, {
        description: datas.description,
        BookNo: datas.BookNo,
        BookName: datas.BookName,
        BookType: datas.BookType,
        Author: datas.Author,
        Price: datas.Price,
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const removeBook = async (id) => {
    const res = await axios.delete(`http://localhost:3001/book/deleteByID/${id}`)
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const getBookType = async (genre) => {
    const res = await axios.get(`http://localhost:3001/book/getType?genre=${genre}`)
        .catch((e) => {
            console.log(e)
        });
    if (res.status !== 200) {
        console.error('Error fetching data');
    }
    console.log(`${genre} Books`, res.data);
    const resData = await res.data;
    return resData;
}

export const getOfferBooks = async (offer) => {
    const res = await axios.get(`http://localhost:3001/book/getType?Offer=${offer}`)
        .catch((e) => {
            console.log(e)
        });
    if (res.status !== 200) {
        console.error('Error fetching data');
    }
    console.log("Offer Books", res.data);
    const resData = await res.data;
    return resData;
}

export const getPagination = async (p) => {
    const res = await axios.get(`http://localhost:3001/book/getbyPagination?p=${p}`)
        .catch((e) => console.log(e))

    if (res.status !== 200) {
        console.log("Unexpected Error");
    }
    const resDatas = await res.data;
    console.log(resDatas);
    return resDatas;
}

export const filterSearch = async (genre, offer, rating, minPrice, maxPrice, minYearPublished, maxYearPublished) => {
    let queryParams = '';
    if (genre) queryParams += `&bookType=${genre}`;
    if (offer) queryParams += `&offer=${offer}`;
    if (rating) queryParams += `&rating=${rating}`;
    if (minPrice) queryParams += `&minPrice=${minPrice}`;
    if (maxPrice) queryParams += `&maxPrice=${maxPrice}`;
    if (minYearPublished) queryParams += `&minYearPublished=${minYearPublished}`;
    if (maxYearPublished) queryParams += `&maxYearPublished=${maxYearPublished}`;

    const res = await axios.get(`http://localhost:3001/book/search?${queryParams}`)
        .catch((e) => console.log(e))

    if (res.status !== 200) {
        console.log("Unexpected Error");
    }
    const resDatas = await res.data;
    console.log(resDatas);
    return resDatas;
}


export const getBookName = async (name) => {
    const res = await axios.get(`http://localhost:3001/book/getType?search=${name}`)
        .catch((e) => {
            console.log(e)
        });
    console.log(res);
    if (res.status !== 200) {
        console.error('Error fetching data');
    }
    console.log(res.data);
    const resData = await res.data;
    return resData;
}

export const ratings = async (users, books, star, comment) => {
    console.log(comment);
    const res = await axios.put("http://localhost:3001/book/rating", {
        user: users,
        star: star,
        prodID: books,
        comment: comment,
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected errors");
    }

    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getRatings = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/book/getByID/${id}/ratings`)
            .catch((e) => {
                console.log(e)
            });
        if (res.status !== 200) {
            console.error('Error fetching data');
            console.log("ok");
        }
        console.log(res);
        const resData = await res.data;
        return resData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

//carts
export const addCart = async (books, users, quantity) => {
    const res = await axios.post("http://localhost:3001/cart/addCart", {
        users: users,
        books: [books],
        quantity: quantity
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getCartItemsByUser = async (id) => {
    const res = await axios.get(`http://localhost:3001/cart/getByID/${id}`)
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const fetchCartItems = async (carts) => {
    try {
        const res = await axios.post('http://localhost:3001/cart/fetchCart', {
            carts: carts
        })
            .catch((e) => {
                console.log(e);
            })
        console.log(res.data);
        if (res.status === 500) {
            return console.log("Unexpected error");
        }
        const resData = await res.data
        return resData;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return null;
    }
}

export const getCartItems = async () => {
    const res = await axios.get('http://localhost:3001/cart/get')
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const removeItemFromCart = async (id) => {
    const res = await axios.delete(`http://localhost:3001/cart/deleteByID/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const updateCart = async (id, quantity) => {
    const res = await axios.put(`http://localhost:3001/cart/updateByID/${id}`, { quantity })
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }

    console.log(res.data);
    const data = await res.data;
    return data;
};


//orders
export const OrderItems = async (books, users, delivered) => {
    const res = await axios.post("http://localhost:3001/order/addOrder", {
        users: users,
        books: [books],
        delivered: delivered
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getOrderItemsById = async (id) => {
    const res = await axios.get(`http://localhost:3001/order/getByID/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const fetchBooksfromOrders = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/order/books/${id}`)
            .catch((e) => {
                console.log(e);
            })
        if (res.status === 500) {
            return console.log("Unexpected error");
        }
        const resData = await res.data
        console.log(resData.books);
        return resData.books;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return null;
    }
}

export const cancelOrder = async (id) => {
    const res = await axios.delete(`http://localhost:3001/order/cancelByID/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

//Favourites

export const addToFav = async (id, bookId) => {
    try {
        const res = await axios.put(`http://localhost:3001/user/addFav/${id}`, {
            bookId: bookId
        })
            .catch((e) => {
                console.log(e);
            })
        if (res.status === 500) {
            return console.log("Unexpected error");
        }
        const resData = await res.data
        console.log(resData);
        return resData;
    } catch (error) {
        console.error("Error adding item:", error);
        return null;
    }
}

export const removeFromFav = async (id, bookId) => {
    console.log(bookId);
    try {
        const res = await axios.delete(`http://localhost:3001/user/removeFav/${id}`, {
            data: { bookId: bookId }
        })
            .catch((e) => {
                console.log(e);
            })
        if (res.status === 500) {
            return console.log("Unexpected error");
        }
        const resData = await res.data
        return resData.books;
    } catch (error) {
        console.error("Error removing item from Fav:", error);
        return null;
    }
}

//image
export const upload = async (image) => {
    const res = await axios.post("http://localhost:3001/image/addimage", {
        image: image
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status !== 200) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getimage = async (id) => {
    try {
        const res = await axios.get("http://localhost:3001/image/get")
            .catch((e) => {
                console.log(e);
            })
        if (res.status === 500) {
            return console.log("Unexpected error");
        }
        const resData = await res.data
        console.log(resData);
        return resData;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return null;
    }
}

export const getDashDatas = async () => {
    const res = await axios.get('http://localhost:3001/admin/dashboard')
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}

export const updateDeliveredStatus = async (id, delivered) => {
    const res = await axios.put('http://localhost:3001/order/updateDelivery', {
        order: id,
        delivered: delivered
    })
        .catch((e) => {
            console.log(e);
        })
    console.log(res);
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = await res.data
    return resData;
}