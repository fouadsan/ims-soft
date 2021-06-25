$(document).ready(function() {
    
    setTimeout(function() {
        $('#row-select').DataTable( {
            "paging": false,
            "info": false
        } );
        $('#footer-search').DataTable( {
            "paging": false,
            "info": false
        } );
        $('#row-delete').DataTable( {
            "paging": false,
            "info": false
        } );


        var table = $('#footer-search').DataTable();

        // [ Apply the search ]
        table.columns().every(function() {
            var that = this;

            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });

       
        var srow = $('#row-select').DataTable();

        $('#row-select tbody').on('click', 'tr', function() {
            $(this).toggleClass('selected');
        });

        var drow = $('#row-delete').DataTable();

        $('#row-delete tbody').on('click', 'tr', function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                drow.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#row-delete-btn').on('click', function() {
            drow.row('.selected').remove().draw(!1);
        });

        // [ Form input ]
        var table = $('#form-input-table').DataTable();

        $('#form-input-btn').on('click', function() {
            var data = table.$('input, select').serialize();
            alert(
                "The following data would have been submitted to the server: \n\n" +
                data.substr(0, 120) + '...'
            );
            return false;
        });

        // [ Search API ]
        function filterGlobal() {
            $('#search-api').DataTable().search(
                $('#global_filter').val(),
                $('#global_regex').prop('checked'),
                $('#global_smart').prop('checked')
            ).draw();
        }

        $('#search-api').DataTable();

        $('input.global_filter').on('keyup click', function() {
            filterGlobal();
        });

        
    }, 5000);
});
