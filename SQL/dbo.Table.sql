CREATE TABLE [dbo].[Markers]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [name] VARCHAR(50) NOT NULL, 
    [address] VARCHAR(80) NOT NULL, 
    [lat] FLOAT NOT NULL, 
    [lng] FLOAT NOT NULL
)
