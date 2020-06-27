const dijkstra = (edges,source,target) => {
    const Q = new Set(),
          prev = {},
          dist = {},
          adj = {}
 
    const vertex_with_min_dist = (Q,dist) => {
        let min_distance = Infinity,
            u = null
 
        for (let v of Q) {
            if (dist[v] < min_distance) {
                min_distance = dist[v]
                u = v
            }
        }
        return u
    }
 
    for (let i=0;i<edges.length;i++) {
        let v1 = edges[i][0], 
            v2 = edges[i][1],
            len = edges[i][2]
 
        Q.add(v1)
        Q.add(v2)
 
        dist[v1] = Infinity
        dist[v2] = Infinity
 
        if (adj[v1] === undefined) adj[v1] = {}
        if (adj[v2] === undefined) adj[v2] = {}
 
        adj[v1][v2] = len
        adj[v2][v1] = len
    }
 
    dist[source] = 0
 
    while (Q.size) {
        let u = vertex_with_min_dist(Q,dist),
            neighbors = Object.keys(adj[u]).filter(v=>Q.has(v)) //Neighbor still in Q 
 
        Q.delete(u)
 
        if (u===target) break //Break when the target has been found
 
        for (let v of neighbors) {
            let alt = dist[u] + adj[u][v]
            if (alt < dist[v]) {
                dist[v] = alt
                prev[v] = u
            }
        }
    }
 
    {
        let u = target,
        S = [u],
        len = 0
 
        while (prev[u] !== undefined) {
            S.unshift(prev[u])
            len += adj[u][prev[u]]
            u = prev[u]
        }
        return [S,len]
    }   
}
 
function calculateShortestPath() {

    let start = document.querySelector("#starting_node").value.toUpperCase();
    let end = document.querySelector("#end_node").value.toUpperCase();
    

    if( document.querySelector("#inputFile").files.length == 0 ){
        document.querySelector("#result").style.display = "none";
        document.querySelector("#error-row").innerHTML = "<b>Please select a file! </b>";
        document.querySelector("#error").style.display = "block";
        return;
    } else if (start == "" || end == "")
    {
        document.querySelector("#result").style.display = "none";
        document.querySelector("#error-row").innerHTML = "<b>Please make sure all fields are filled in correctly! </b>";
        document.querySelector("#error").style.display = "block";
        return;
    }


    let [path,length] = dijkstra(graph, start, end);

    document.querySelector("#error").style.display = "none";
    document.querySelector("#result-row").innerHTML = "<div class='col-md-9'><b>Shortest path </b>= (" + path + ")</div> <div class='col-md-3 text-right'> <b>Cost</b> = " + length + "</div>";
    document.querySelector("#result").style.display = "block";
}