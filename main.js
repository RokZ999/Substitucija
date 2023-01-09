get_raw_txt();

function get_raw_txt(){
    let raw_txt = null;
    let raw_txt_without_split = null;
    let last_chars_of_words = null;
    let first_chars_of_words = null;
    let independent_letters = null;
    let single_letters = null;
    let bi_grams = null;
    let three_grams = null;

    $(document).on('input', '#raw_txt', function() {
        $('#raw_txt2').val("");
        raw_txt_without_split = $(this).val().replace(/,|\?|!|\./g, "");
        raw_txt = raw_txt_without_split.split(" ");   

        last_chars_of_words = raw_txt.map(x => x[x.length - 1]);
        first_chars_of_words  = raw_txt.map(x => x[0]);
        independent_letters = raw_txt.map(x => x.length === 1  ?  x  : undefined);
        single_letters = [...raw_txt_without_split].map((_, i) => raw_txt_without_split.slice(i, i + 1));
        bi_grams = [...raw_txt_without_split].map((_, i) => raw_txt_without_split.slice(i, i + 2));
        three_grams = [...raw_txt_without_split].map((_, i) => raw_txt_without_split.slice(i, i + 3));

        appendTable(doStat(last_chars_of_words),'koncnice');
        appendTable(doStat(first_chars_of_words),'zacetnice');
        appendTable(doStat(independent_letters),'samostojne-crke');
        appendTable(doStat(single_letters),'najpogoste-crke');
        appendTable(doStat(bi_grams),'dvojniki');
        appendTable(doStat(three_grams),'trojniki');
        replacingTable(single_letters);
    });

}




function doStat(list) {
    let stat = {};
    list = list.filter(x => typeof x !== 'undefined' && !x.includes(' '));
    const lenSortedList = list.length;
    const noDuplicates = new Set(list);

    stat = [...noDuplicates].reduce((acc, x) => ({
      ...acc,
      [x]: (list.filter(y => y === x).length / lenSortedList) * 100
    }), {});
    stat = Object.entries(stat)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    return stat;
}

function appendTable(listOfData,id){     

    const $table = $('<table>').addClass('table-bordered table-sm');

    const $tr = $('<tr>');
    for (const [key, value] of Object.entries(listOfData)) {
    
      const $th = $('<th>').text(key+":");
      $tr.append($th);
      $table.append($tr);
    }

    const $tr2 = $('<tr>');
    for (const [key, value] of Object.entries(listOfData)) {

      const $td = $('<td>').text(value.toFixed(1) + "%");
      $tr2.append($td);
      $table.append($tr2);
    }
    
    $('#' + id).html($table);
}

function replacingTable(listOfData){     
  let i = 0;
  listOfData = listOfData.filter(x => typeof x !== 'undefined' && !x.includes(' '));
  listOfData = [...new Set(listOfData)];
  const $table = $('<table>').addClass('table-bordered table-sm');

  const $tr = $('<tr>');
  for (const key of listOfData) {
  
    const $th = $('<th>').text(key).attr('id', 'original-input-' + i++);;
    $tr.append($th);
    $table.append($tr);
  }

  const $tr2 = $('<tr>');
  i = 0;
  for (const key of listOfData) {
    const $td = $('<td><input>').attr('id', 'guess-input-' + i++)
    .attr('maxlength', '10');
    $tr2.append($td);
    $table.append($tr2);
  }
  
  $('#zamnejaj').html($table);

  let cypher = $('#raw_txt').val();

  $('#zamnejaj').find('input').on('input', function() {
      const $input = $(this);

      //let original = $('#original-input-' + $input.index()).val();
      let original = $('#original-input-0').val();
      let replace = $input.val();

    
      console.log(original)

      cypher = cypher.replace(original, replace);
    
      $('#raw_txt2').val(cypher);
    });
}