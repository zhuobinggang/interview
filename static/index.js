// var datatable = $( '#t' ).DataTable();
let all = null;
let table = $('#t').DataTable();

const nowOpens = (datas, now) => {
  if(now == '' || now == null){
    now = toTaibeiTime()
    console.log('+++++++')
  }else{
    now = toTaibeiTime(now)
  }
  const nowWeekday = (() => {
    switch(now.getDay()){
      case 1: return 'one'
      case 2: return 'two'
      case 3: return 'three'
      case 4: return 'four'
      case 5: return 'five'
      case 6: return 'six'
      case 0: return 'seven'
    }
  })();

  
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  return datas.filter(it => {
    const [start, end] = it[nowWeekday].split('-')
    if(end == null){//close
      return false
    }else {
      const [startH, startM] = start.split(':')
      const [endH, endM] = end.split(':')

      if(nowHour >=  startH && nowMin >= startM && nowHour <= endH && nowMin < endM){
        console.log(nowHour, nowMin, start, end)
        return true
      }else{
        return false
      }
    }
  })
}

function mapTolist(r){
  return [r.name, r.one,r.two, r.three, r.four, r.five, r.six, r.seven]
}

function toTaibeiTime(time = new Date()){
  time = new Date(time);
  var asiaTime = time.toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
  console.log(asiaTime)
  return new Date(asiaTime);
}

function resetTable(rows){
  table.destroy()
  table = $('#t').DataTable({
    data: rows
  })
}

function filterOpenAtTime(){
  const time = $('input[name="time"]').val();
  console.log(time);
  if(time == null || time == ''){
    resetTable(nowOpens(all).map(mapTolist));
  }else{
    resetTable(nowOpens(all, time).map(mapTolist))
  }
}

$.get('/all').done(rows => {
  all = rows;
  resetTable(nowOpens(rows).map(mapTolist))
})