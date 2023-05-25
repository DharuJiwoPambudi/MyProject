$(document).ready(function () {


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
                GetValueCount(function (countByDepartment, countByGender) {
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
                                label: 'Persebaran karyawan',
                                backgroundColor: 'rgba(60,141,188,0.9)',
                                borderColor: 'rgba(60,141,188,0.8)',
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
                                backgroundColor: 'rgba(60,141,188,0.9)',
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
                                backgroundColor: 'rgba(60,141,188,0.9)',
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
                        labels: ['Laki-laki', 'Perempuan'],
                        datasets: [
                            {
                                data: data_count.map(function (item) {
                                    return item.count;
                                }),
                                //data: [100, 20, 30],
                                backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
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
                        data: pieData,
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

function GetValueCount(callback) {
    var countByDepartment = {};
    var countByGender = {}; // Menyimpan data jumlah karyawan per departemen berdasarkan jenis kelamin

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

            // Mengembalikan data countByDepartment dan countByGender melalui callback
            callback(countByDepartment, countByGender);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

