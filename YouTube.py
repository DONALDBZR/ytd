from pytube import YouTube
link = input("Enter the link of the video: ")
yt = YouTube(link)
print("Title: ", yt.title)
print("Length: ", yt.length, " seconds")
stream = yt.streams.get_by_itag(140)
print('Downloading video')
stream.download('C:\Apache24\htdocs\ytd.local\Videos') 
print('Task Completed!')