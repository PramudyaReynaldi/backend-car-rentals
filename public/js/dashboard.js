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
});