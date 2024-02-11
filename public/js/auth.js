// $(document).ready(function(){
//     $("#loginForm").submit(function (event) {
//         event.preventDefault();

//         var email = $("#form2Example18").val();
//         var password = $("#form2Example28").val();

//         if (!email || !password) {
//             $("#error-message").html("Please fill all the fields").show();
//             return;
//         }

//         // Lakukan validasi lainnya jika diperlukan

//         // Jika form ini adalah form untuk login admin, ubah action-nya
//         if (email === "admin@example.com") {
//             $("#loginForm").attr("action", "/login/admin");
//         }

//         // Jika validasi berhasil, submit formulir
//         $("#loginForm").unbind("submit").submit();
//     });
// });