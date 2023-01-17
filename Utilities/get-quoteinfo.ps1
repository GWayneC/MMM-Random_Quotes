
$data = get-content C:\Users\Garfield\source\repos\MMM-Random_Quotes\quotes.json -raw
$quotes = convertfrom-json $data
write-host "Total number of quotes" $quotes.Count
write-host "----------------------------------" 
$ds_sorted = @($quotes | Sort-Object -Property Quote_Count -Descending)
Write-Host "The highest quote count is " $ds_sorted[0].Quote_Count
for($i = 0 ; $i -le $ds_sorted[0].Quote_Count; $i++)
{
  $dc = @($quotes | Where-Object {$_.Quote_Count -eq $i})
  $temp = $quotes[$i].Quote_Count
  $ts = $dc.Count
  Write-Progress -Activity "Analyzing Quotes" -status "Found $ts that were used $i time(s)" -percentComplete ($i / $quotes.Count * 100)
  if($dc.Count -ge 0)
  {
     $p = "times are"
     if($i -lt 2) {$p = "time is"}
     Write-host "The number of Quotes that were used " $i $p ":" $dc.Count 
     if($i -eq 0){
        $dc_0 = @($quotes | Where-Object {$_.Quote_Count -eq 0})
        Write-host "`t"  $dc_0[0].Quote  $dc_0[0].Author -ForegroundColor yellow -BackgroundColor black
     }
     if($i -eq 1){
         $dc_1 = @($quotes | Where-Object {$_.Quote_Count -eq 1})
        Write-host "`t"  $dc_1[0].Quote  $dc_1[0].Author -ForegroundColor yellow -BackgroundColor black
     }
  }
}
  $ds_sorted = @($quotes | Sort-Object -Property Quote_Count -Descending)
  $top_count = $ds_sorted[0].Quote_Count
  $top_quotes = @($ds_sorted | Where-Object {$_.Quote_Count -eq  $top_count})
  if($top_quotes.Count -eq 1)
  {
      write-host "----------------------------------" 
      write-host "The most used quote is:" 
      write-host "----------------------------------" 
      $top_quotes
      write-host "----------------------------------" 
  }
