//$(document).ready(function () {
//    $('#TB_Department').DataTable({
//        "ajax": {
//            url: "https://localhost:8001/api/Departments",
//            type: "GET",
//            "datatype": "json",
//            "dataSrc": "data",
//        },
//        "columns": [
//            {
//                "data": "departmentName"
//            }
//        ]
//    })
//})
//=================================================================================================================================================================================
//$(document).ready(function () {
//    $('#TB_Department').DataTable({
//        "ajax": {
//            url: "https://localhost:8001/api/Departments",
//            type: "GET",
//            "datatype": "json",
//            "dataSrc": "data",
//        },
//        "columns": [
//            {
//                "data": "",
//                "defaultContent": ""
//            },
//            {
//                "data": "departmentName"
//            },
//            {
//                "data": null,
//                "render": function (data, type, row) {
//                    var updateId = "modal-edit-" + data.id;
//                    var deleteId = "modal-delete-" + data.id;
//                    //return '<button class="btn btn-warning fas fa-edit"  onclick="edit(' + row.departmentId + ')"></button> ' +
//                    //    '<button class="btn btn-danger far fa-trash-alt"  onclick="remove(' + row.departmentId + ')"></button>' +
//                    return '<button class="btn btn-warning fas fa-edit" data-toggle="modal" data-target="#' + updateId + '"></button> ' +
//                        '<button class="btn btn-danger far fa-trash-alt" id="btn-delete" data-toggle="modal" data-target="#' + deleteId + '"></button>' +
//                        `<div class="modal fade" id="` + updateId + `">
//                            <div class="modal-dialog">
//                                <div class="modal-content">
//                                    <div class="modal-header">
//                                        <h4 class="modal-title">Edit Nama Department</h4>
//                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                        <span aria-hidden="true">&times;</span>
//                                        </button>
//                                    </div>
//                                    <form>
//                                        <div class="card-body">
//                                            <div class="form-group">
//                                                <label for="name">Name</label>
//                                                <input type="text" class="form-control" id="name" value="`+ data.departmentName + `" name="name">
//                                            </div>
//                                        </div>
//                                        <!-- /.card-body -->

//                                        <div class="card-footer">
//                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                            <button type="submit" class="btn btn-warning">Update</button>
//                                        </div>
//                                    </form>
//                                    <!-- /.modal-content -->
//                                </div>
//                        <!-- /.modal-dialog -->
//                            </div>
//                        </div>`+
//                        `<div class="modal fade" id="` + deleteId + `" tabindex="-1">
//                            <div class="modal-dialog">
//                                <div class="modal-content">
//                                    <div class="modal-header">
//                                        <h4 class="modal-title">Hapus Data</h4>
//                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                            <span aria-hidden="true">&times;</span>
//                                        </button>
//                                    </div>
//                                <div class="modal-body">
//                                    <h5><b>Apakah Anda Yakin Ingin Menghapus Department `+ data.departmentName + `?</b></h5>
//                                </div>
//                                <div class="modal-footer justify-content-between">
//                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                    <button type="button" class="btn btn-danger">Hapus</button>
//                                </div>
//                            </div>
//                            <!-- /.modal-content -->
//                        </div>
//                        <!-- /.modal-dialog -->
//                    </div>`;

//                }
//            }
//        ],
//        "rowCallback": function (row, data, index) {
//            $('td:eq(0)', row).html(index + 1); // generate number and set in first column
//        }
//    })
//})

//function Remove(id) {
//    // handle delete button click here
//    debugger;
//    $.ajax({
//        url: "https://localhost:8001/api/Departments/" + id,
//        type: "DELETE",
//        dataType: "json",
//    }).then((result) => {

//        if (result.status == 200) {
//            alert(result.message);
//        }
//        else {
//            alert(result.message);
//        }
//    });
//}
//function Delete() {
//    then((result) => {
//    })
//}

//=================================================================================================================================================================================
var table = $('#TB_Department').DataTable({
    "ajax": {
        url: "https://localhost:8001/api/Departments",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
        },
        "datatype": "json",
        "dataSrc": "data",
    },
    "columns": [
        {
            "data": "",
            "defaultContent": "",
            //render: function (row, data, type, meta) {
            //    //return meta.row + meta.settings._iDisplayStart + 1 + "." //ga bisa reload ke 1 kal di urutan lain
            //    return meta.row + 1 + "."
            //},
            "orderable": false

        },
        {
            "data": "departmentName"
        },
        {
            /*"data": null,*/
            "render": function (data, type, row) {
                return '<button class="btn btn-warning fas fa-edit"  data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')"></button> ' +
                    '<button class="btn btn-danger far fa-trash-alt"  data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Remove(' + row.id + ')"></button>';
            },
            "orderable": false
        }
    ],

    "rowCallback": function (row, data, index, meta) {
        //$('td:eq(0)', row).html(index + 1); // generate number and set in first column
        table.column(0, { order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
        //$(row).find('td:nth-child(2), td:nth-child(3)').addClass('custom-width');
    }
})
//.addClass('custom-table');


function checkSessionAndTokenExpiration() {
    const userToken = sessionStorage.getItem('userToken');
    if (!userToken) {
        // Session tidak ada, arahkan ke halaman login
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please login first...!',
            showConfirmButton: false,
            timer: 2000,
            didClose: () => {
                window.location.href = "/login/index";
            }
        })
        //document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
        return;
    }

    // Memeriksa apakah token telah kadaluwarsa
    const decodedToken = decodeToken(userToken);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
    console.log('Expired time: ' + expirationTime + '\nCurrent time: ' + currentTime)
    debugger;
    if (currentTime > expirationTime) {
        sessionStorage.removeItem('userToken');
        // Token telah kadaluwarsa, arahkan ke halaman login
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your session is expired...! :p',
            showConfirmButton: false,
            timer: 2000,
            didClose: () => {
                sessionStorage.removeItem('userToken')
                window.location.href = "/login/index";
            }
        })
        //document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
        return;
    }
    //document.body.style.display = 'block'; // Tampilkan body jika token dan sesi valid
    // Token masih valid, lanjutkan ke halaman berikutnya
}

//function checkSessionAndTokenExpiration() {
//    return new Promise((resolve, reject) => {
//        try {
//            const userToken = sessionStorage.getItem('userToken');
//            if (!userToken) {
//                // Session tidak ada, arahkan ke halaman login
//                Swal.fire({
//                    icon: 'error',
//                    title: 'Oops...',
//                    text: 'Please login first...!',
//                    showConfirmButton: false,
//                    timer: 2000,
//                    didClose: () => {
//                        window.location.href = "/login/index";
//                    }
//                });
//                document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
//                reject(); // Reject Promise
//                return;
//            }

//            // Memeriksa apakah token telah kadaluwarsa
//            const decodedToken = decodeToken(userToken);
//            const expirationTime = decodedToken.exp;
//            const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

//            if (currentTime > expirationTime) {
//                sessionStorage.removeItem('userToken');
//                // Token telah kadaluwarsa, arahkan ke halaman login
//                Swal.fire({
//                    icon: 'error',
//                    title: 'Oops...',
//                    text: 'Your session is expired...! :p',
//                    showConfirmButton: false,
//                    timer: 2000,
//                    didClose: () => {
//                        window.location.href = "/login/index";
//                    }
//                });
//                document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
//                reject(); // Reject Promise
//                return;
//            }

//            document.body.style.display = 'block'; // Tampilkan body jika token dan sesi valid
//            resolve(); // Resolve Promise
//        } catch (error) {
//            console.error(error);
//            reject(error); // Reject Promise
//        }
//    });
//}
// Fungsi untuk mengurai token
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

$(document).ready(function () {
    checkSessionAndTokenExpiration();
    table;
})

function ClearScreen() {

    $('#Id').val('');
    $('#Name').val('');

    $('#Save').show();
    $('#Update').hide();
}

function Update() {
    //debugger;
    UpdateValidation();
}

function GetById(id) {
    $.ajax({
        url: "https://localhost:8001/api/Departments/" + id,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.data;//binding data agar nilainya terisi
            $('#Id').val(obj.id);
            $('#Name').val(obj.departmentName);
            $('#myModal').modal('show');
            $('#Save').hide();
            $('#Update').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Remove(id) {
    // handle delete button click here
    debugger;
    $.ajax({
        url: "https://localhost:8001/api/Departments/" + id,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.data;
            $('#Id').val(obj.id);
            DeleteValidation();
            //$('#myModalDelete').modal('show');
        },
        error: function (errormessage) {
            Warning();
        }
    });
}

function Save() {
    var Department = new Object();

    Department.departmentName = $('#Name').val(); //relocate from index to department table (departmentName)
    //debugger;
    $.ajax({
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
        },
        url: 'https://localhost:8001/api/Departments',
        data: JSON.stringify(Department),
        contentType: "application/json; charset=utf-8"
    }).then((result) => {
        debugger;
        if (result.status == result.status == 201 || result.status == 204 || result.status == 200) {
            Succes();
            //location.reload();
            //alert("Data berhasil dimasukkan");
        }
        else { //harusnya kalo kita udah else if = 400 masuk tapi kalo kesalahan di client harus make catch
            alert("Data gagal dimasukkan 1");
        }
    }).catch((error) => {
        //alert("Data gagal dimasukkan");
        UnSucces();
    })

}

//=================================================================================================================================================================================
// Sweetalert
function Succes() {
    Swal.fire({
        icon: 'success',
        title: 'Greats...',
        text: 'Data has been added!',
        didClose: () => {
            //$('#TB_Department').DataTable().destroy();
            table.ajax.reload(); // reload the page
        }
    })
}

function UnSucces() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong',
        //didClose: () => {
        //    //$('#TB_Department').DataTable().destroy();
        //    table.ajax.reload(); // reload the page
        //}
    })
}

function Warning() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
}

function UpdateValidation() {
    var updateValidation = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-warning mr-1',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    updateValidation.fire({
        title: 'Do you want to save the changes?',
        text: "You won't be able to revert the data!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        reverseButton: true
    }).then((result) => {
        updateValidation = Swal.mixin({
            confirmButtonColor: '#007bff'
        })
        if (result.isConfirmed) {
            var Department = new Object();
            Department.id = $('#Id').val();
            Department.departmentName = $('#Name').val();
            $.ajax({
                url: "https://localhost:8001/api/Departments", // Use the ID to construct the update URL
                type: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
                },
                data: JSON.stringify(Department),
                contentType: "application/json; charset=utf-8"
            }).then(result => {
                if (result.status == result.status == 201 || result.status == 204 || result.status == 200) {

                    updateValidation.fire({
                        title: 'Updated!',
                        text: 'Your data has been canged.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        didClose: () => {
                            table.ajax.reload();
                        }
                    })

                }
                else {
                    updateValidation.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            }).catch((error) => {
                updateValidation.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    
                    footer: '<a href="">Department name already exists</a>'
                })
            })
        } else if (result.dismiss == Swal.DismissReason.cancel) {
            updateValidation.fire({
                title: 'Cancelled',
                text: 'Your data is safe :)',
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            })
        }
    })
}

function DeleteValidation() {
    var deleteValidation = Swal.mixin({
        //confirmButtonColor: '#ffc107',
        //cancelButtonColor: '#dc3545',
        customClass: {
            confirmButton: 'btn btn-warning mr-1',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
    deleteValidation.fire({
        title: 'Are you sure to delete?',
        text: "You won't be able to revert the data!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButton: true
    }).then((result) => {
        deleteValidation = Swal.mixin({
            confirmButtonColor: '#007bff'
        })
        if (result.isConfirmed) {
            var Department = new Object();
            Department.id = $('#Id').val();
            $.ajax({
                url: "https://localhost:8001/api/Departments/" + Department.id, // Use the ID to construct the update URL
                type: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
                },
                dataType: "json"
            }).then(result => {
                if (result.status == result.status == 201 || result.status == 204 || result.status == 200) {

                    deleteValidation.fire({
                        title: 'Deleted!',
                        text: 'Your data has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        didClose: () => {
                            table.ajax.reload();
                        }
                    })

                }
                else {
                    deleteValidation.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            })
        } else if (result.dismiss == Swal.DismissReason.cancel) {
            deleteValidation.fire({
                title: 'Cancelled',
                text: 'Your data is safe :)',
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            })
        }
    })
}

//=================================================================================================================================================================================
//=================================================================================================================================================================================
//=================================================================================================================================================================================
//$(document).ready(function () {
//    $('#tbUniversity').DataTable({
//        "ajax": {
//            url: "http://localhost:8089/api/Universities",
//            type: "GET",
//            "datatype": "json",
//            "dataSrc": "data",
//            //success: function (result) {
//            //    console.log(result)
//            //}
//        },
//        "columns": [
//            {
//                render: function (data, type, row, meta) {
//                    return meta.row + meta.settings._iDisplayStart + 1 + "."
//                }
//            },
//            { "data": "name" },
//            {
//                "render": function (data, type, row) {
//                    return '<button class="btn btn-warning " data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')"><i class="fa fa-pen"></i></button >' + '&nbsp;' +
//                        '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Delete(' + row.id + ')"><i class="fa fa-trash"></i></button >'
//                }
//            }
//        ]
//    })
//})
//=================================================================================================================================================================================
//=================================================================================================================================================================================
//function edit(id) {
//    // handle edit button click here
//    // Get user input
//    const newName = prompt("Enter the new department name:");
//    $('#TB_Department').DataTable({
//        "ajax": {
//            paging: false,
//            searching: false,
//            url: "https://localhost:8001/api/Departments/${id}",
//            type: "PUT",
//            "datatype": "json",
//            "data": { name: newName },
//            success: function (response) {
//                // Handle success response
//                console.log("OK");
//            },
//            error: function (error) {
//                // Handle error response
//                console.log("OK");
//            }
//        },
//    })
//}
//=================================================================================================================================================================================




