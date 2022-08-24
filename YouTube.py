from pytube import YouTube
link = input("Enter the link of the video: ")
yt = YouTube(link)
print('Downloading video')
stream = yt.streams.get_by_itag(22)
stream.download() 
print('Task Completed!')