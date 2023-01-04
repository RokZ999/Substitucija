get_raw_txt();

var some_list =  ["a","b","c", "ž", "ž"];



function get_raw_txt(){
    let raw_txt = null;
    $(document).on('input', '#raw_txt', function() {
        raw_txt = $(this).val().split(" ");    
        console.log(raw_txt);
        appendTable(doStat(some_list));
    });   

}

function doStat(list) {
    let stat = {};
    list = list.filter(x => !x.includes(' '));
    const lenSortedList = list.length;
    const noDuplicates = new Set(list);

    
    stat = [...noDuplicates].reduce((acc, x) => ({
      ...acc,
      [x]: (list.filter(y => y === x).length / lenSortedList) * 100
    }), {});
    stat = Object.entries(stat)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    console.log(Object.entries(stat).map(([k, v]) => `${k} -> ${v}`).join('\n'));
    return stat;
}

function appendTable(stat){      
      const $table = $('<table>').addClass('table');
      for (const [key, value] of Object.entries(stat)) {
        const $tr = $('<tr>');
        const $th = $('<th>').text(key);
        const $td = $('<td>').text(value + "%");
        $tr.append($th, $td);
        $table.append($tr);
      }
      console.log($table)
      $('#table-container').html($table);
      
}