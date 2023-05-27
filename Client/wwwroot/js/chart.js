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
        return;
    }

    // Memeriksa apakah token telah kadaluwarsa
    const decodedToken = decodeToken(userToken);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
    console.log('Expired time: ' + expirationTime + '\nCurrent time: ' + currentTime)
    debugger;
    if (currentTime > expirationTime) {
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
        return;
    }

    // Token masih valid, lanjutkan ke halaman berikutnya
}

// Fungsi untuk memeriksa sesi dan kadaluwarsa token
//async function checkSessionAndTokenExpiration() {
//    const userToken = sessionStorage.getItem('userToken');
//    if (!userToken) {
//        // Session tidak ada, arahkan ke halaman login
//        Swal.fire({
//            icon: 'error',
//            title: 'Oops...',
//            text: 'Please login first...!',
//            showConfirmButton: false,
//            timer: 2000,
//            didClose: () => {
//                window.location.href = "/login/index";
//            }
//        });
//        document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
//        return;
//    }

//    // Memeriksa apakah token telah kadaluwarsa
//    const decodedToken = decodeToken(userToken);
//    const expirationTime = decodedToken.exp;
//    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

//    if (currentTime > expirationTime) {
//        sessionStorage.removeItem('userToken');
//        // Token telah kadaluwarsa, arahkan ke halaman login
//        Swal.fire({
//            icon: 'error',
//            title: 'Oops...',
//            text: 'Your session is expired...! :p',
//            showConfirmButton: false,
//            timer: 2000,
//            didClose: () => {
//                window.location.href = "/login/index";
//            }
//        });
//        document.body.style.display = 'none'; // Sembunyikan body setelah menampilkan alert
//        return;
//    }
//    document.body.style.display = 'block'; // Tampilkan body jika token dan sesi valid
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

    $(function () {
        /* ChartJS
         * -------
         * Here we will create a few charts using ChartJS
         */

        //--------------
        //- AREA CHART -
        //--------------
        $.ajax({
            url: "https://localhost:8001/api/Departments",
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                GetValueCount(function (countByDepartment, countByGender, totalValueLaki, totalValuePerempuan) {
                    var data_count = [];


                    var temp_name = result.data;
                    var id = temp_name.map(function (result_department) {
                        return result_department.id;
                    });
                    var name = temp_name.map(function (result_department) {
                        return result_department.departmentName;
                    });

                    id.forEach(function (department) {
                        var count = countByDepartment[department] || 0;
                        var genderCount = countByGender[department] || {}; // Data jumlah karyawan per jenis kelamin
                        var maleCount = genderCount["0"] || 0; // Jumlah karyawan laki-laki
                        var femaleCount = genderCount["1"] || 0; // Jumlah karyawan perempuan

                        data_count.push({
                            department: department,
                            count: count,
                            maleCount: maleCount,
                            femaleCount: femaleCount
                        });
                    });

                    data_count.forEach(function (item) {
                        console.log('Department:', item.department, 'Total Employee:', item.count, 'Male Employee:', item.maleCount, 'Female Employee:', item.femaleCount);
                    });

                    //var colors = Chart.getDatasetColors();
                    var areaChartData = {
                        labels: name,
                        datasets: [
                            {
                                label: 'Karyawan',
                                backgroundColor: '#01bfff',
                                borderColor: 'rgba(60,141,188,3)',
                                pointRadius: false,
                                pointColor: '#3b8bba',
                                pointStrokeColor: 'rgba(60,141,188,1)',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(60,141,188,1)',
                                data: data_count.map(function (item) {
                                    return item.count;
                                })
                            },
                            {
                                label: 'Laki-laki',
                                backgroundColor: '#00bfff',
                                borderColor: 'rgba(60,141,188,0.8)',
                                pointRadius: false,
                                pointColor: '#00bfff',
                                pointStrokeColor: 'rgba(60,141,188,1)',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(60,141,188,1)',
                                data: data_count.map(function (item) {
                                    return item.maleCount;
                                })
                            },
                            {
                                label: 'Perempuan',
                                backgroundColor: '#ff69b4',
                                borderColor: 'rgba(60,141,188,0.8)',
                                pointRadius: false,
                                pointColor: '#ff69b4',
                                pointStrokeColor: 'rgba(60,141,188,1)',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(60,141,188,1)',
                                data: data_count.map(function (item) {
                                    return item.femaleCount;
                                })
                            }
                        ]
                    };

                    var donutData = {
                        labels: name,
                        datasets: [
                            {
                                data: data_count.map(function (item) {
                                    return item.count;
                                }),
                                //data: [100, 20, 30],
                                backgroundColor: generateColorPalette(data_count.length),
                            }
                        ]
                    }
                    var donutData1 = {
                        labels: ['Laki-laki', 'Perempuan'],
                        datasets: [
                            {
                                data: [totalValueLaki, totalValuePerempuan],
                                //data: [100, 20, 30],
                                backgroundColor: ['#00bfff', '#ff69b4'],
                            }
                        ]
                    }

                    //-------------
                    //- PIE CHART -
                    //-------------
                    // Get context with jQuery - using jQuery's .get() method.
                    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
                    var pieChartCanvas2 = $('#pieChart2').get(0).getContext('2d')
                    var pieData = donutData;
                    var pieData1 = donutData1;
                    var pieOptions = {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                    //Create pie or douhnut chart
                    // You can switch between pie and douhnut using the method below.
                    new Chart(pieChartCanvas, {
                        type: 'pie',
                        data: pieData,
                        options: pieOptions
                    });
                    new Chart(pieChartCanvas2, {
                        type: 'pie',
                        data: pieData1,
                        options: pieOptions
                    });
                    //-------------
                    //- BAR CHART -
                    //-------------
                    var barChartCanvas = $('#barChart').get(0).getContext('2d')
                    var barChartCanvas2 = $('#barChart2').get(0).getContext('2d')
                    var barChartData = $.extend(true, {}, areaChartData)
                    var barChartData1 = $.extend(true, {}, areaChartData)

                    // Mengatur dataset untuk barChartData
                    var temp0 = areaChartData.datasets[0];
                    barChartData.datasets = [temp0];
                    //barChartData.datasets[0].label = name;

                    // Mengatur dataset untuk barChartData1
                    var temp1 = areaChartData.datasets[1];
                    var temp2 = areaChartData.datasets[2];
                    barChartData1.datasets = [temp1, temp2];
                    barChartData1.datasets[0].label = 'Laki-laki';
                    barChartData1.datasets[1].label = 'Perempuan';

                    var barChartOptions = {
                        responsive: true,
                        maintainAspectRatio: false,
                        datasetFill: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1, // Mengatur ukuran langkah pada sumbu nilai Y
                                    callback: function (value) {
                                        if (value % 1 === 0) { // Memeriksa apakah nilai adalah bilangan bulat
                                            return value;
                                        }
                                    }
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: false // Mengatur agar semua label pada sumbu X ditampilkan
                                }
                            }]
                        }

                    };
                    new Chart(barChartCanvas, {
                        type: 'bar',
                        data: barChartData,
                        options: barChartOptions
                    });
                    new Chart(barChartCanvas2, {
                        type: 'bar',
                        data: barChartData1,
                        options: barChartOptions
                    });
                });


            }
        });
    });
    // Get value to department
});

//Menghitug jumlah karyawan berdasrkan departemen dan menghitung jumlah karyawan berdasarkan jenis kelamin baik untuk keseluruhan maupun perdepartemen
function GetValueCount(callback) {
    var countByDepartment = {}; // Menyimpan data jumlah kaeyawan per departemen
    var countByGender = {}; // Menyimpan data jumlah karyawan per departemen berdasarkan jenis kelamin
    var totalValueLaki = 0; 
    var totalValuePerempuan = 0;

    $.ajax({
        url: "https://localhost:8001/api/Employees",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
        },
        success: function (result) {
            var employees = result.data;

            employees.forEach(function (employee) {
                var departmentId = employee.departmentId;
                var gender = employee.gender;

                // Menghitung jumlah karyawan per departemen
                if (!countByDepartment.hasOwnProperty(departmentId)) {
                    countByDepartment[departmentId] = 1;
                } else {
                    countByDepartment[departmentId]++;
                }

                // Menghitung jumlah karyawan per departemen berdasarkan jenis kelamin
                if (!countByGender.hasOwnProperty(departmentId)) {
                    countByGender[departmentId] = {};
                }

                if (!countByGender[departmentId].hasOwnProperty(gender)) {
                    countByGender[departmentId][gender] = 1;
                } else {
                    countByGender[departmentId][gender]++;
                }

                //Menghitung jumlah karyawan laki-laki


                if (employee.gender === 0) {
                    // Mengakses nilai karyawan laki-laki, misalnya menggunakan property 'value'
                    totalValueLaki += 1;
                }


                //Menghitung jumlah karyawan perempuan



                if (employee.gender === 1) {
                    // Mengakses nilai karyawan laki-laki, misalnya menggunakan property 'value'
                    totalValuePerempuan += 1;
                }

            });

            // Mencetak jumlah karyawan per departemen
            for (var departmentId in countByDepartment) {
                if (countByDepartment.hasOwnProperty(departmentId)) {
                    console.log('Department ID:', departmentId, 'Total Employee:', countByDepartment[departmentId]);
                }
            }

            // Mencetak jumlah karyawan per departemen berdasarkan jenis kelamin
            for (var departmentId in countByGender) {
                if (countByGender.hasOwnProperty(departmentId)) {
                    for (var gender in countByGender[departmentId]) {
                        if (countByGender[departmentId].hasOwnProperty(gender)) {
                            console.log('Department ID:', departmentId, 'Gender:', gender, 'Total Employee:', countByGender[departmentId][gender]);
                        }
                    }
                }
            }
            console.log('Total Value of Male Employees:', totalValueLaki);
            console.log('Total Value of Male Employees:', totalValuePerempuan);
            // Mengembalikan data countByDepartment dan countByGender melalui callback
            callback(countByDepartment, countByGender, totalValueLaki, totalValuePerempuan);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

function generateColorPalette(numColors) {
    var colorPalette = [];
    var hueStep = 360 / numColors;

    for (var i = 0; i < numColors; i++) {
        var hue = i * hueStep;
        var color = 'hsl(' + hue + ', 100%, 50%)';
        colorPalette.push(color);
    }

    return colorPalette;
}