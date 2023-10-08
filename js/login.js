$(document).ready(function() {


    $("#btn-sign-in").click(function() {
        var username = $("#user").val();
        var password = $("#pass").val();
        localStorage.setItem("email", username);

        $.ajax({
                url: "http://localhost:8080/signin",
                method: "POST",
                data: {
                    email: username,
                    password: password,
                },
                timeout: 60000,
                statusCode: {
                    403: function() {
                        alert("Sai tai khoan");
                    },
                },

            })
            // khi goi API thi ket qua se tra o day
            .done(function(response) {
                var respObj = response.data;
                if (respObj != null && respObj != "") {
                    // luu token vao bo nho cua browser
                    // "gioHang": [{id:1, title:"Shirt", price:109,soluong:10}]
                    localStorage.setItem("token", respObj.token);
                    localStorage.setItem("user_id", respObj.user_id);
                    window.location.href = "index.html";
                }
            });
    });




    $("#btn-sign-up").click(function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định
        Add();
    });


    function Add() {
        let username = $("#userNew").val()
        let password = $("#passNew").val()
        let repeatPW = $("#passRP").val()
        let email = $("#email").val()

        if (password !== repeatPW) {
            $("#password-match-error").css("display", "block");
            return;
        } else {
            $("#password-match-error").css("display", "none");
        }
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/signup',

            data: {
                username: username,
                password: password,
                email: email
            },
            success: function(result) {
                console.log('befor pare', result)

                if (result.statusCode === 200) {
                    $("#password-new-error").addClass("hidden");
                    $("#user-new-error").addClass("hidden");
                    $("#email-new-error").addClass("hidden");

                    alert('dang ky thanh cong')
                    window.location.href = "login.html"
                }
            },
            error: function(errormessage) {

                try {
                    const errorData = JSON.parse(errormessage.responseText);
                    errorMessage = ""
                    var errorMessage = errorData.data;
                    console.log(errorMessage)

                    if (errorMessage.toLowerCase().includes("username")) {
                        $("#user-new-error").removeClass("hidden");
                        $("#user-new-error").text(errorMessage);
                        $("#email-new-error").addClass("hidden");
                        $("#password-new-error").addClass("hidden");

                    } else if (errorMessage.includes("password")) {
                        $("#password-new-error").removeClass("hidden");
                        $("#password-new-error").text(errorMessage);
                        $("#user-new-error").addClass("hidden");

                        $("#email-new-error").addClass("hidden");


                    } else if (errorMessage.toLowerCase().includes("email")) {
                        $("#email-new-error").removeClass("hidden");
                        $("#email-new-error").text(errorMessage);
                        $("#password-new-error").addClass("hidden");
                        $("#user-new-error").addClass("hidden");

                    }
                    // Xử lý các trường dữ liệu khác tương tự

                    // Hoặc hiển thị thông báo lỗi chung
                    // $("#general-error").text(errorMessage);


                    // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
                } catch (error) {
                    console.log("Error parsing error response:", error);
                }
            }
        });
    }


    getUserInfo();


});



function getUserInfo() {


    let email = localStorage.getItem('email')

    $.ajax({

        url: "http://localhost:8080/account",
        method: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },

        dataType: "json",
        data: {
            email: email
        },
        success: function(result) {
            console.log(result.data)
            if (result.statusCode === 200) {
                var user = result.data;
                $("#username").val(user.userName);
                $("#name").val(user.id);
                $("#email").val(user.email);
            } else {
                // Xử lý khi không tìm thấy người dùng
                alert("User not found");
            }
        },
        error: function(xhr, status, error) {
            // Xử lý khi có lỗi trong quá trình gọi API
            console.log("Error:", error);
        }
    });
}