$(document).ready(function(){
    $('.buttonDeleteCar').on('click', function(e) {
        e.preventDefault();
        var productId = $(this).data('product-id');

        alertPopupConfirm('Apakah anda yakin ingin menghapus data ini?', 'Hapus Data', 'warning', 'Hapus')
        .then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'DELETE',
                    url: '/dashboard/delete/' + productId,
                    success: function() {
                        alertPopup('Berhasil!', 'Data berhasil dihapus', 'success')
                        .then(() => {
                            location.reload();
                        })
                    },
                    error: function() {
                        alertPopup('Error!', 'Terjadi kesalahan saat menghapus data', 'error');
                    }
                })
            }
        })
    })

    // $('.buttonSaveEditCar').on('click', function(e) {
    //     e.preventDefault();

    //     const productId = $(this).data("product-id");

    //     const manufacture = $('#inputManufactureCar').val();
    //     const model = $('#inputModelCar').val();
    //     const rentalPerDay = $('#inputRentalPerDay').val();

    //     $.ajax({
    //         type: 'PATCH',
    //         url: '/dashboard/update/' + productId,
    //         data: {
    //             manufacture: manufacture,
    //             model: model,
    //             rentPerDay: rentalPerDay
    //         },
    //         success: function() {
    //             alertPopup('Berhasil!', 'Data berhasil diubah', 'success')
    //             .then(() => {
    //                 location.reload();
    //             })
    //         },
    //         error: function() {
    //             alertPopup('Error!', 'Terjadi kesalahan saat mengubah data', 'error');
    //         }
    //     })
    // });

    $('.buttonSaveEditCar').on('click', function (e) {
        e.preventDefault();

        const productId = $(this).data("product-id");
        
        const manufacture = $('#inputManufactureCar').val();
        const model = $('#inputModelCar').val();
        const rentalPerDay = $('#inputRentalPerDay').val();
        const fileInput = $('#inputFileCar')[0].files[0];

        // Membuat objek FormData dan menambahkan data ke dalamnya
        const formData = new FormData();
        formData.append('manufacture', manufacture);
        formData.append('model', model);
        formData.append('rentPerDay', rentalPerDay);
        formData.append('image', fileInput);

        // Menggunakan AJAX untuk mengirim data ke server
        $.ajax({
            type: 'PATCH',
            url: '/dashboard/update/' + productId,
            data: formData,
            contentType: false, // Penting untuk mengirim file
            processData: false, // Penting untuk mengirim file
            success: function () {
                alertPopup('Berhasil!', 'Data berhasil diubah', 'success')
                    .then(() => {
                        location.reload();
                    })
            },
            error: function (error) {
                alertPopup('Error!', 'Terjadi kesalahan saat mengubah data', 'error');
                console.error('Error:', error.responseJSON.msg);
            }
        });
    });
});